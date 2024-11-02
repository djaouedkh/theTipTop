// src/app/core/services/stats.service.ts
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { AdvancedStatsDto } from '../../dtos/use-cases/stats/advanced-stats.dto';
import { AgeGroup } from '../../dtos/use-cases/stats/enums/age-group.enum';
import { Gender } from '../../dtos/use-cases/stats/enums/gender.enum';
import { GlobalStatsDto } from '../../dtos/use-cases/stats/global-stats.dto';

@Injectable({
    providedIn: 'root',
})
export class StatsService {
    constructor(private apiService: ApiService) {}

    getAllStats(): Observable<GlobalStatsDto> { 
        return this.apiService.get<GlobalStatsDto>('stats/count-all-stats');
    }

    getAllAdvancedStats(): Observable<AdvancedStatsDto> {
        return this.apiService.get<AdvancedStatsDto>('stats/count-all-advanced-stats');
    }

    getAllCountParticipantsByGender(gender?: Gender): Observable<number | { male: number; female: number }> {
        return this.apiService.get<number | { male: number; female: number }>(`stats/count-participants-by-gender`, { gender });
    }

    getAllCountParticipantsByAgeGroup(ageGroups?: AgeGroup[]): Observable<{ [key: string]: number }> {
        return this.apiService.get<{ [key: string]: number }>('stats/count-participants-by-age-group', { ageGroups });
    }

    getAllCountGainsDistribution(): Observable<{ [gainName: string]: number }> {
        return this.apiService.get<{ [gainName: string]: number }>('stats/count-gains-distribution');
    }
}
