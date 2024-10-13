import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { PlayToTheGameDto } from '../../../../../../backend/src/use-cases/participate/dtos/play-to-the-game.dto';

@Injectable({
    providedIn: 'root',
})
export class ParticipateService {
    constructor(private apiService: ApiService) {}

    playToTheGame(code: string): Observable<PlayToTheGameDto> { 
        return this.apiService.get<PlayToTheGameDto>(`participate/${code}`);
    }
}
