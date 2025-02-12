import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [EmailController],
  providers: [EmailService, PrismaService, ConfigService],
})
export class EmailModule {}