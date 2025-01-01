import { Controller, Get, Post, Body, Patch, Param, Delete,UnauthorizedException  } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';
import { LoginDTO } from './dto/LoginDto'; 
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: Prisma.usersCreateInput) {
    return this.userService.create(createUserDto);
  }
  @Post('login')
  async login(@Body() loginDto: LoginDTO) {
    const user = await this.userService.login(loginDto);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user; // В реальном проекте обычно возвращают token или user без пароля.
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Prisma.usersUpdateInput) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
