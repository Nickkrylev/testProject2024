export interface WebSocketFile {
    idSender: string;
    messageId: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    data: Buffer; // Или Uint8Array, в зависимости от ваших нужд
  }