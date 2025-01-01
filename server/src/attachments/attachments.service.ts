import { Injectable,BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class AttachmentsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async handleFileUpload(
    body: { idsender: string; messageid: string },
    file: Express.Multer.File,
  ) {
    const { idsender, messageid } = body;

    if (!idsender || !messageid) {
      throw new BadRequestException('idsender and messageid are required');
    }

    // Формируем путь для сохранения файла
    const uploadPath = `./uploads/${idsender}/${messageid}`;
    fs.mkdirSync(uploadPath, { recursive: true });

    // Генерируем уникальное имя файла
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    const filePath = path.join(uploadPath, uniqueName);

    // Перемещаем файл в папку
    // fs.renameSync(file.path, filePath);
    fs.writeFileSync(filePath, file.buffer);
    // Формируем DTO для записи в базу данных
    const createAttachmentDto: Prisma.attachmentsCreateInput = {
      message_id: messageid,
      file_path: filePath,
      file_name: file.originalname,
    };

    // Сохраняем запись в базе данных через Prisma
    return this.create(createAttachmentDto);
  }
  async create(createAttachmentDto: Prisma.attachmentsCreateInput) {
    return await this.databaseService.attachments.create({
      data: createAttachmentDto,
    });
  }


  async findManyByMessage(messageId: string) {
    return await this.databaseService.attachments.findMany({
      where: {
        message_id: messageId, 
      },
    });
  }


  async update(id: string, updateAttachmentDto: Prisma.attachmentsUpdateInput) {
    return await this.databaseService.attachments.update({
      where: {
        id,
      },
      data: updateAttachmentDto,

    });
  }


  async remove(id: string) {
    return await this.databaseService.attachments.delete({
      where: {
        id,
      },
    });
  }
}
