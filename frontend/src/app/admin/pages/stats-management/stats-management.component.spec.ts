// src/app/admin/pages/stats-management/stats-management.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsManagementComponent } from './stats-management.component';
import { StatsService } from '../../../core/services/use-cases/stats.service';
import { of } from 'rxjs';
import { HighchartsChartModule } from 'highcharts-angular';
import { AdvancedStatsDto } from '../../../core/dtos/use-cases/stats/advanced-stats.dto';

class MockStatsService {
  getAllAdvancedStats() {
    return of({
      globalStats: {
        totalTickets: 100,
        ticketsPlayed: 60,
        ticketsNotPlayed: 40,
        totalParticipants: 80,
        claimedGains: 30,
        unclaimedGains: 20,
      },
      participantsByGender: {
        male: 50,
        female: 30,
      },
      participantsByAgeGroup: {
        '18-25': 20,
        '26-35': 30,
        '36-45': 10,
        '46-55': 15,
        '56+': 5,
      },
      gainsDistribution: {
        'Gift Card': 10,
        'Discount Coupon': 15,
      },
    } as AdvancedStatsDto);
  }
}

describe('StatsManagementComponent', () => {
  let component: StatsManagementComponent;
  let fixture: ComponentFixture<StatsManagementComponent>;
  let statsService: StatsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatsManagementComponent],
      imports: [HighchartsChartModule], // Add HighchartsChartModule here
      providers: [{ provide: StatsService, useClass: MockStatsService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsManagementComponent);
    component = fixture.componentInstance;
    statsService = TestBed.inject(StatsService);
    fixture.detectChanges();
  });

  it('should call fetchStats on ngOnInit', () => {
    spyOn(component, 'fetchStats').and.callThrough();
    component.ngOnInit();
    expect(component.fetchStats).toHaveBeenCalled();
  });

  it('should set stats correctly when fetchStats is called', () => {
    component.fetchStats();
    expect(component.stats).toEqual({
      globalStats: {
        totalTickets: 100,
        ticketsPlayed: 60,
        ticketsNotPlayed: 40,
        totalParticipants: 80,
        claimedGains: 30,
        unclaimedGains: 20,
      },
      participantsByGender: {
        male: 50,
        female: 30,
      },
      participantsByAgeGroup: {
        '18-25': 20,
        '26-35': 30,
        '36-45': 10,
        '46-55': 15,
        '56+': 5,
      },
      gainsDistribution: {
        'Gift Card': 10,
        'Discount Coupon': 15,
      },
    } as AdvancedStatsDto);
  });
});
