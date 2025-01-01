import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';
import { MessagesService } from '../messages/messages.service';
import { AttachmentsService } from '../attachments/attachments.service';
import { WebSocketFile } from './interfaces/websocket-file.interface';
@WebSocketGateway({ cors: true, path: '/ws' })
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messagesService: MessagesService,
    private readonly attachmentsService: AttachmentsService,
  ) {}

  // Подключение клиента
  handleConnection(client: WebSocket) {
    console.log('Клиент подключился');
  }

  // Отключение клиента
  handleDisconnect(client: WebSocket) {
    console.log('Клиент отключился');
  }

  // Отправка сообщения
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() message: { senderId: string; receiverId: string; text: string },
    @ConnectedSocket() client: WebSocket,
  ) {
    console.log('Сообщение от клиента:', message);

    // Сохранение сообщения в базе данных
    const savedMessage = await this.messagesService.create({
      sender_id: message.senderId,
      receiver_id: message.receiverId,
      content: message.text,
    });

    // Рассылка сообщения всем подключенным клиентам
    this.server.clients.forEach((socket: WebSocket) => {
      socket.send(
        JSON.stringify({
          type: 'newMessage',
          data: savedMessage,
        }),
      );
    });
  }

  // Получение всех сообщений
  @SubscribeMessage('getAllMessages')
  async handleGetAllMessages(
    @MessageBody() { user1Id, user2Id }: { user1Id: string; user2Id: string },
    @ConnectedSocket() client: WebSocket,
  ) {
    const messages = await this.messagesService.findConversation(user1Id, user2Id);

    client.send(
      JSON.stringify({
        type: 'allMessages',
        data: messages,
      }),
    );
  }

  // Получение списка собеседников
  @SubscribeMessage('getContacts')
  async handleGetContacts(
    @MessageBody() { userId }: { userId: string },
    @ConnectedSocket() client: WebSocket,
  ) {
    const contacts = await this.messagesService.findUsersCommunicatedWith(userId);

    client.send(
      JSON.stringify({
        type: 'contacts',
        data: contacts,
      }),
    );
  }

  // Обновление сообщения
  @SubscribeMessage('updateMessage')
  async handleUpdateMessage(
    @MessageBody() { id, text }: { id: string; text: string },
    @ConnectedSocket() client: WebSocket,
  ) {
    const updatedMessage = await this.messagesService.update(id, { content: text });

    // Рассылка обновленного сообщения всем клиентам
    this.server.clients.forEach((socket: WebSocket) => {
      socket.send(
        JSON.stringify({
          type: 'updatedMessage',
          data: updatedMessage,
        }),
      );
    });
  }

  // Удаление сообщения
  @SubscribeMessage('deleteMessage')
  async handleDeleteMessage(
    @MessageBody() { id }: { id: string },
    @ConnectedSocket() client: WebSocket,
  ) {
    const deletedMessage = await this.messagesService.remove(id);

    // Рассылка информации об удалении всем клиентам
    this.server.clients.forEach((socket: WebSocket) => {
      socket.send(
        JSON.stringify({
          type: 'deletedMessage',
          data: { id: deletedMessage.id },
        }),
      );
    });
  }

  // @SubscribeMessage('uploadFile')
  // async handleFileUpload(
  //   @MessageBody() body: WebSocketFile,
  //   @ConnectedSocket() client: WebSocket,
  // ) {
  //   try {
  //     const savedAttachment = await this.attachmentsService.handleWebSocketFileUpload(body);

  //     // Уведомляем всех подключенных клиентов о новой загрузке файла
  //     this.server.clients.forEach((socket: WebSocket) => {
  //       socket.send(
  //         JSON.stringify({
  //           type: 'fileUploaded',
  //           data: savedAttachment,
  //         }),
  //       );
  //     });
  //   } catch (error) {
  //     console.error('Ошибка при загрузке файла:', error);
  //     client.send(
  //       JSON.stringify({
  //         type: 'error',
  //         message: 'Не удалось загрузить файл',
  //       }),
  //     );
  //   }
  // }
}
