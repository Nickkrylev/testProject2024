import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { MessagesModule } from './messages/messages.module';
import { AttachmentsModule } from './attachments/attachments.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [DatabaseModule,  UserModule, MessagesModule, AttachmentsModule, WebsocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

