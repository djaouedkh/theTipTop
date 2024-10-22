// src/app/admin/pages/dashboard/dashboard.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { StatsService } from '../../../core/services/use-cases/stats.service';
import { of } from 'rxjs';
import { GlobalStatsDto } from '../../../../../../backend/src/use-cases/stats/dtos/global-stats.dto';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockStatsService {
  getAllStats() {
    return of({
      totalTickets: 100,
      ticketsPlayed: 70,
      ticketsNotPlayed: 30,
      totalParticipants: 50,
      claimedGains: 20,
      unclaimedGains: 10,
    } as GlobalStatsDto);
  }
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let statsService: StatsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: StatsService, useClass: MockStatsService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    statsService = TestBed.inject(StatsService);
    fixture.detectChanges();
  });

  it('should call getAllStats on ngOnInit and retrieve GlobalStatsDto', () => {
    spyOn(statsService, 'getAllStats').and.callThrough();

    component.ngOnInit();

    expect(statsService.getAllStats).toHaveBeenCalled();
    expect(component.stats).toEqual({
      totalTickets: 100,
      ticketsPlayed: 70,
      ticketsNotPlayed: 30,
      totalParticipants: 50,
      claimedGains: 20,
      unclaimedGains: 10,
    } as GlobalStatsDto);
  });
});
