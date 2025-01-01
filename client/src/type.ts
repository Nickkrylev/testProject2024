// src/common/interfaces/message.interface.ts

export interface IMessage {
    id: string; // Уникальный идентификатор сообщения
    content: string; // Текстовое содержимое сообщения
    created_at: Date; // Дата и время создания сообщения
    sender_id: string; // ID отправителя
    receiver_id: string; // ID получателя
    attachments?: string[]; // Ссылки на вложения (если есть)
  }
// src/common/interfaces/user.interface.ts

export interface IUser {
    id: string; // Уникальный идентификатор пользователя
    name: string; // Имя пользователя
    avatarUrl?: string; // URL аватара пользователя (необязательно)
  }
    