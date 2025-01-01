import { Injectable, ConflictException ,UnauthorizedException} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { LoginDTO } from './dto/LoginDto'; 
import bcrypt  from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: Prisma.usersCreateInput) {
    try {
     
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const userData = { ...createUserDto, password: hashedPassword };
      return await this.databaseService.users.create({ data: userData ,});

    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          `A record with this value already exists: ${error.meta.target}`,
        );
      }
      throw error;
    }
  }
  async login(loginDto: LoginDTO) {
    const { identifier, password } = loginDto;
    const user = await this.databaseService.users.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone_number: identifier },
        ],
      },
    });
  
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
  
    const { password: _, ...userWithoutPassword } = user;
  
    return userWithoutPassword;
  }
  // async login(loginDto: LoginDTO) {
  //   const { identifier, password } = loginDto;
  
  //   // Пытаемся найти пользователя по email или phone
  //   const user = await Prisma.user.findFirst({
  //     where: {
  //       OR: [
  //         { email: identifier },
  //         { phone: identifier },
  //       ],
  //     },
  //   });
  
  //   if (!user) {
  //     throw new UnauthorizedException('User not found');
  //   }
  
  //   // Проверяем пароль с использованием bcrypt
  //   const isPasswordValid = await bcrypt.compare(password, user.password);
  
  //   if (!isPasswordValid) {
  //     throw new UnauthorizedException('Invalid password');
  //   }
  
  //   // Генерация JWT-токена (если нужно)
  //   // const token = this.jwtService.sign({ id: user.id, email: user.email });
  
  //   // Возвращаем пользователя (без пароля — уберите его из возвращаемых данных)
  //   const { password: _, ...userWithoutPassword } = user;
  
  //   // Если используете токен:
  //   // return { token, user: userWithoutPassword };
  
  //   return userWithoutPassword;
  // }

  async findAll() {
    return this.databaseService.users.findMany();
  }

  async findOne(idOrNickname: string) {
    return this.databaseService.users.findFirst({
      where: {
        OR: [
          { id: idOrNickname },
          { nickname: idOrNickname }
        ],
      },
    });
  }
  

  async update(id: string, updateUserDto: Prisma.usersUpdateInput) {
    try {
      return await this.databaseService.users.update({
        where: {
          id,
        },
        data: updateUserDto,
      });
    } catch (error) {
      if (
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `A record with this value already exists: ${error.meta.target}`,
        );
      }
      throw error;
    }
  }

  async remove(id: string) {
    return this.databaseService.users.delete({
      where: {
        id: id,
      },
    });
  }
}
