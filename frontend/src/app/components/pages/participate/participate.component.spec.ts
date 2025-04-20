import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { ParticipateComponent } from './participate.component';
import { ParticipateService } from '../../../core/services/use-cases/participate.service';
import { of } from 'rxjs';
import { PlayToTheGameDto } from '../../../core/dtos/use-cases/participate/play-to-the-game.dto';

class MockParticipateService {
  playToTheGame(code: string, userId: number) {
    return of({ isWinner: true, gain: null } as PlayToTheGameDto);
  }
}

describe('ParticipateComponent', () => {
  let component: ParticipateComponent;
  let fixture: ComponentFixture<ParticipateComponent>;
  let store: MockStore;
  let participateService: ParticipateService;

  const initialState = { 
    userState: { id: 14, name: 'Test', email: 'test@example.com', role: 'user', token: 'abc' } 
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticipateComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: ParticipateService, useClass: MockParticipateService },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipateComponent);
    component = fixture.componentInstance;
    participateService = TestBed.inject(ParticipateService);
    fixture.detectChanges();
  });

  it('should call playToTheGame with the correct ticketCode when onSubmit is called', () => {
    // Arrange
    const ticketCode = 'TICKET123';
    component.ticketCode = ticketCode;
    const playToTheGameSpy = spyOn(participateService, 'playToTheGame').and.callThrough();

    // Act
    component.onSubmit();

    // Assert
    expect(playToTheGameSpy).toHaveBeenCalledWith(ticketCode, 14);
  });
});