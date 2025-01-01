// // import { NestFactory } from '@nestjs/core';
// // import { AppModule } from './app.module';

// // async function bootstrap() {
// //   const app = await NestFactory.create(AppModule);
  
// //   // Включаем поддержку CORS
// //   app.enableCors({
// //     origin: 'http://localhost:5173', // или другой адрес фронтенда
// //     credentials: true,              // если нужно передавать куки/авторизацию
// //   });

// //   // Запускаем приложение на порту из .env или 3000 по умолчанию
// //   await app.listen(process.env.PORT ?? 3000);
// // }
// // bootstrap();
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { WsAdapter } from '@nestjs/platform-ws'; // Импортируем WsAdapter

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
  
//   // Устанавливаем WebSocket Adapter
//   app.useWebSocketAdapter(new WsAdapter(app));
  
//   // Включаем поддержку CORS
//   app.enableCors({
//     origin: 'http://localhost:5173', // или другой адрес фронтенда
//     credentials: true,              // если нужно передавать куки/авторизацию
//   });

//   // Запускаем приложение на порту из .env или 3000 по умолчанию
//   await app.listen(process.env.PORT ?? 3000);
// }
// bootstrap();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WsAdapter } from '@nestjs/platform-ws'; // Импортируем WsAdapter
import { join } from 'path'; // Для работы с путями
import { NestExpressApplication } from '@nestjs/platform-express'; // Импортируем NestExpressApplication

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Устанавливаем WebSocket Adapter
  app.useWebSocketAdapter(new WsAdapter(app));
  
  // Включаем поддержку CORS
  app.enableCors({
    origin: 'http://localhost:5173', // или другой адрес фронтенда
    credentials: true,              // если нужно передавать куки/авторизацию
  });

  // Настраиваем раздачу статических файлов
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads', // Файлы будут доступны по пути /uploads
  });

  // Запускаем приложение на порту из .env или 3000 по умолчанию
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
