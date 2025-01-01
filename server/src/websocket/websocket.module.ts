import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { MessagesModule } from '../messages/messages.module';
import { AttachmentsModule } from 'src/attachments/attachments.module';
@Module({
  imports: [MessagesModule,AttachmentsModule], // Импортируем модуль
  providers: [WebsocketGateway], // Регистрируем Gateway
})
export class WebsocketModule {}
