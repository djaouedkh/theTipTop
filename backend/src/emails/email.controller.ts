import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailSendDto } from './dtos/email-send.dto';
import { EmailResponseDto } from './dtos/email-send.dto';

@Controller('emails')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send-test')
  async sendEmailTest(@Body() emailSendDto: EmailSendDto): Promise<EmailResponseDto> {
    return this.emailService.sendEmailTest(emailSendDto);
  }

  @Post('send')
  async sendEmail(@Body() emailSendDto: EmailSendDto): Promise<EmailResponseDto> {
    return this.emailService.sendEmail(emailSendDto);
  }
}
