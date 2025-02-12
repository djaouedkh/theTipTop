import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { EmailResponseDto, EmailSendDto } from '../dtos/emails/email-send.dto';

@Injectable({
    providedIn: 'root',
})
export class EmailService {
    private readonly baseUrl = 'emails';

    constructor(private apiService: ApiService) {}

    sendTest(emailSend: EmailSendDto): Observable<EmailResponseDto> {
        return this.apiService.post<EmailResponseDto>(`${this.baseUrl}/send-test`, emailSend);
    }

    send(emailSend: EmailSendDto): Observable<EmailResponseDto> {
        return this.apiService.post<EmailResponseDto>(`${this.baseUrl}/send`, emailSend);
    }

}
