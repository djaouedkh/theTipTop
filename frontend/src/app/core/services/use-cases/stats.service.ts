// src/app/core/services/stats.service.ts
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { GlobalStatsDto } from '../../../../../../backend/src/use-cases/stats/dtos/global-stats.dto';
import { AdvancedStatsDto } from '../../../../../../backend/src/use-cases/stats/dtos/advanced-stats.dto';
import { Gender } from '../../../../../../backend/src/use-cases/stats/enums/gender.enum';
import { AgeGroup } from '../../../../../../backend/src/use-cases/stats/enums/age-group.enum';

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
