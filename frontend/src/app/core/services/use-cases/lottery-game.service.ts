import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { UserGetDto } from '../../../../../../backend/src/users/dtos/user-get.dto';

@Injectable({
    providedIn: 'root',
})
export class LotteryGameService {
    private readonly baseUrl = 'lottery-game';

    constructor(private apiService: ApiService) {}

    getWinner(): Observable<UserGetDto> {
        return this.apiService.get<UserGetDto>(`${this.baseUrl}/winner`);
    }

    drawWinner(): Observable<{ winner: UserGetDto }> {
        return this.apiService.post<{ winner: UserGetDto }>(`${this.baseUrl}/draw`, {});
    }
}
