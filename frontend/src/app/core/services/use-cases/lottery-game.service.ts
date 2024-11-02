import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { LotteryGameGetDto } from '../../dtos/lottery-games/lottery-game-get.dto';

@Injectable({
    providedIn: 'root',
})
export class LotteryGameService {
    private readonly baseUrl = 'lottery-game';

    constructor(private apiService: ApiService) {}

    get(): Observable<LotteryGameGetDto> {
        return this.apiService.get<LotteryGameGetDto>(`${this.baseUrl}/get`);
    }

    play(): Observable<LotteryGameGetDto> {
        return this.apiService.post<LotteryGameGetDto>(`${this.baseUrl}/play`, {});
    }
}
