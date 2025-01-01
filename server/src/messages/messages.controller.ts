import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Prisma } from '@prisma/client';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() createMessageDto: Prisma.messagesCreateInput) {
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  findAll() {
    return this.messagesService.findAll();
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: Prisma.messagesUpdateInput) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }

  @Get('conversation/:user1Id/:user2Id')
 findConversation( @Param('user1Id') user1Id: string, @Param('user2Id') user2Id: string) {
  return this.messagesService.findConversation(user1Id, user2Id);
}

@Get('allChatbyID/:userId')
  findUsersCommunicatedWith(@Param('userId') userId: string) {
    return this.messagesService.findUsersCommunicatedWith(userId);
  }
}
