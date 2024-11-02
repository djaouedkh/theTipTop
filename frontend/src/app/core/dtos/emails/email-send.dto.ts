export class EmailSendDto {
    recipients: string[];
    subject: string;
    body: string;
  }
  
  // dtos/email-response.dto.ts
  export class EmailResponseDto {
    success: boolean;
    message: string;
}
  