import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MessagesService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createMessageDto: Prisma.messagesCreateInput) {

      return await this.databaseService.messages.create({
        data: createMessageDto,
      });
    
  }

 
  async findAll() {
    return this.databaseService.messages.findMany();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }
  async findConversation(user1Id: string, user2Id: string) {
    return this.databaseService.messages.findMany({
      where: {
        OR: [
          {
            sender_id: user1Id,
            receiver_id: user2Id,
          },
          {
            sender_id: user2Id,
            receiver_id: user1Id,
          },
        ],
      },
      orderBy: {
        created_at: 'asc', 
      },
    });
  }
  
  async update(id: string, updateMessageDto: Prisma.messagesUpdateInput) {
    return await this.databaseService.messages.update({
      where: {
        id,
      },
      data: {
        ...updateMessageDto,
        updated_at: new Date(),
      },
    });
  }

  async remove(id: string) {
    return this.databaseService.messages.delete({
      where: {
        id: id,
      },
    });
  }
  
  async findUsersCommunicatedWith(userId: string) {
    // 1. Сначала получаем сообщения
    const messages = await this.databaseService.messages.findMany({
      where: {
        OR: [
          { sender_id: userId },
          { receiver_id: userId },
        ],
      },
      select: {
        sender_id: true,
        receiver_id: true,
        content: true,
        created_at: true, // Date | null
        // Не указываем sender и receiver, т.к. у вас нет таких реляций в схеме
      },
    });
  
    // 2. Определяем удобный тип для хранения данных о последнем сообщении
    //    Обратите внимание, created_at: Date | null
    //    name?: string — чтобы потом добавить имя
    type MessageData = {
      content: string;
      created_at: Date | null;
      name?: string;
    };
  
    // 3. Создаём Map, где ключ — это ID собеседника, а значение — данные последнего сообщения
    const userMessages = new Map<string, MessageData>();
  
    // 4. Заполняем карту userMessages
    messages.forEach((message) => {
      // Проверяем отправителя
      if (message.sender_id !== userId) {
        const existingMessage = userMessages.get(message.sender_id);
        if (
          !existingMessage ||
          (existingMessage.created_at || 0) < (message.created_at || 0)
        ) {
          userMessages.set(message.sender_id, {
            content: message.content,
            created_at: message.created_at,
          });
        }
      }
  
      // Проверяем получателя
      if (message.receiver_id !== userId) {
        const existingMessage = userMessages.get(message.receiver_id);
        if (
          !existingMessage ||
          (existingMessage.created_at || 0) < (message.created_at || 0)
        ) {
          userMessages.set(message.receiver_id, {
            content: message.content,
            created_at: message.created_at,
          });
        }
      }
    });
  
    // 5. Из ключей userMessages извлекаем все userId собеседников,
    //    чтобы одним запросом получить их имена
    const userIds = Array.from(userMessages.keys());
  
    // 6. Делаем запрос в таблицу пользователей, чтобы получить имена (и всё что нужно)
    //    Предположим, в базе есть таблица users и поле name.
    const users = await this.databaseService.users.findMany({
      where: { id: { in: userIds } },
      select: {
        id: true,
        name: true,
      },
    });
  
    // 7. Создаём удобную карту: userId -> userName
    const userMap = new Map(users.map((user) => [user.id, user.name]));
  
    // 8. Вписываем имя пользователя в структуру userMessages
    userMessages.forEach((messageData, otherUserId) => {
      messageData.name = userMap.get(otherUserId) || 'Unknown';
    });
  
    // 9. Возвращаем массив, где каждый элемент — данные о собеседнике
    //    userId + информация о последнем сообщении + имя
    return Array.from(userMessages).map(([otherUserId, data]) => ({
      userId: otherUserId,
      content: data.content,
      created_at: data.created_at,
      name: data.name,
    }));
  }
  
  
}


