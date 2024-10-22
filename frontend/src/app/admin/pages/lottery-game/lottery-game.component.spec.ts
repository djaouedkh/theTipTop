// src/app/admin/pages/lottery-game/lottery-game.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LotteryGameComponent } from './lottery-game.component';
import { LotteryGameService } from '../../../core/services/use-cases/lottery-game.service';
import { of, throwError } from 'rxjs';
import { LotteryGameGetDto } from '../../../../../../backend/src/lottery-games/dtos/lottery-game-get.dto';

class MockLotteryGameService {
  get() {
    return of({ id: 1, name: 'New Year Raffle', desc: 'Win amazing prizes', price: 500, userId: 1 } as LotteryGameGetDto);
  }

  play() {
    return of({ id: 1, name: 'New Year Raffle', desc: 'Win amazing prizes', price: 500, userId: 1 } as LotteryGameGetDto);
  }
}

describe('LotteryGameComponent', () => {
  let component: LotteryGameComponent;
  let fixture: ComponentFixture<LotteryGameComponent>;
  let lotteryGameService: LotteryGameService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LotteryGameComponent],
      providers: [{ provide: LotteryGameService, useClass: MockLotteryGameService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryGameComponent);
    component = fixture.componentInstance;
    lotteryGameService = TestBed.inject(LotteryGameService);
    fixture.detectChanges();
  });

  it('should call checkForWinner on ngOnInit', () => {
    spyOn(component, 'checkForWinner').and.callThrough();
    component.ngOnInit();
    expect(component.checkForWinner).toHaveBeenCalled();
  });

  it('should set lotteryGame on checkForWinner', () => {
    component.checkForWinner();
    expect(component.lotteryGame).toEqual({ id: 1, name: 'New Year Raffle', desc: 'Win amazing prizes', price: 500, userId: 1 } as LotteryGameGetDto);
  });

  it('should call play and set lotteryGame on drawWinner', () => {
    spyOn(lotteryGameService, 'play').and.callThrough();
    component.drawWinner();
    expect(lotteryGameService.play).toHaveBeenCalled();
    expect(component.lotteryGame).toEqual({ id: 1, name: 'New Year Raffle', desc: 'Win amazing prizes', price: 500, userId: 1 } as LotteryGameGetDto);
  });

  it('should set isLoading to true while drawing winner and false after', () => {
    component.drawWinner();
    expect(component.isLoading).toBe(false);
  });

  it('should set errorMessage if play fails', () => {
    spyOn(lotteryGameService, 'play').and.returnValue(throwError(() => new Error('Draw failed')));
    component.drawWinner();
    expect(component.errorMessage).toBe('Draw failed');
    expect(component.isLoading).toBe(false);
  });
});
