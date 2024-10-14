import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { PlayToTheGameDto } from '../../../../../../backend/src/use-cases/participate/dtos/play-to-the-game.dto';
import { GlobalStatsDto } from '../../../../../../backend/src/use-cases/stats/dtos/global-stats.dto';

@Injectable({
    providedIn: 'root',
})
export class StatsService {
    constructor(private apiService: ApiService) {}

    getAllStats(): Observable<GlobalStatsDto> { 
        return this.apiService.get<GlobalStatsDto>(`stats/all-stats`);
    }
}
