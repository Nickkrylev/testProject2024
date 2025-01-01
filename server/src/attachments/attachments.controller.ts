import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AttachmentsService } from './attachments.service';
import { Prisma } from '@prisma/client';

@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // async create(
  //   @Body() body: { idsender: string; messageid: string },
  //   @UploadedFile() file: Express.Multer.File,
    
  // ) {console.log(body,file)
  //   if (!file) {
  //     throw new BadRequestException('File no loaded');
  //   }

 
  //   return this.attachmentsService.handleFileUpload(body, file);
  // }
  @Post(':senderid/:messageid')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Param('senderid') idsender: string,
    @Param('messageid') messageid: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
  

    if (!file) {
      throw new BadRequestException('File not loaded');
    }

    return this.attachmentsService.handleFileUpload({ idsender, messageid }, file);
  }


  @Get(':id')
  findManybyMessage(@Param('id') id: string) {
    return this.attachmentsService.findManyByMessage(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAttachmentDto: Prisma.attachmentsUpdateInput,
) {
    return this.attachmentsService.update(id, updateAttachmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attachmentsService.remove(id);
  }
}
