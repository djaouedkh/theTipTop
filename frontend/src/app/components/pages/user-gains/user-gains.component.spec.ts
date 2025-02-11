// user-gains.component.spec.ts (unit tests)
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserGainsComponent } from './user-gains.component';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { TicketGetDto } from '../../../core/dtos/tickets/ticket-get.dto';
import { TicketService } from '../../../core/services/ticket.service';
import { UserStoreService } from '../../../core/stores/users/user-store.service';
import { userReducer } from '../../../core/stores/users/user.reducer';

// Mock data
const mockTickets: TicketGetDto[] = [
  {
    id: 1,
    code: 'TICKET123',
    isDelivered: false,
    contestId: 1,
    contest: { id: 1, name: 'Contest 1', startDate: new Date(), endDate: new Date() },
    gainId: 2,
    gain: { id: 2, name: 'Gain 2', desc: 'Description 2', price: 100, tickets: [] },
    userId: 1,
    user: undefined,
  },
];

const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'user',
  token: 'some-token',
};

const mockUserState = {
  id: mockUser.id,
  name: mockUser.name,
  email: mockUser.email,
  role: mockUser.role,
  token: mockUser.token,
};

// Unit tests
describe('UserGainsComponent - Unit Tests', () => {
  let component: UserGainsComponent;
  let fixture: ComponentFixture<UserGainsComponent>;
  let ticketService: jasmine.SpyObj<TicketService>;
  let userStoreService: jasmine.SpyObj<UserStoreService>;

  beforeEach(async () => {
    const ticketServiceSpy = jasmine.createSpyObj('TicketService', ['searches']);
    const userStoreServiceSpy = jasmine.createSpyObj('UserStoreService', ['getUser']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule.forRoot({ userState: userReducer })],
      declarations: [UserGainsComponent],
      providers: [
        { provide: TicketService, useValue: ticketServiceSpy },
        { provide: UserStoreService, useValue: userStoreServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserGainsComponent);
    component = fixture.componentInstance;
    ticketService = TestBed.inject(TicketService) as jasmine.SpyObj<TicketService>;
    userStoreService = TestBed.inject(UserStoreService) as jasmine.SpyObj<UserStoreService>;
  });

  it('should load user gains if user is in the store', () => {
    // Arrange
    userStoreService.getUser.and.returnValue(of(mockUserState));
    ticketService.searches.and.returnValue(of(mockTickets));

    // Act
    fixture.detectChanges();

    // Assert
    expect(userStoreService.getUser).toHaveBeenCalled();
    expect(ticketService.searches).toHaveBeenCalledWith({ userId: mockUser.id }, { gain: true });
    expect(component.userGains).toEqual(mockTickets);
    expect(component.errorMessage).toBeNull();
  });

  it('should display an error message if user is not in the store', () => {
    // Arrange
    userStoreService.getUser.and.returnValue(of({ id: null, name: null, email: null, role: null, token: null }));

    // Act
    fixture.detectChanges();

    // Assert
    expect(userStoreService.getUser).toHaveBeenCalled();
    expect(ticketService.searches).not.toHaveBeenCalled();
    expect(component.userGains).toEqual([]);
    expect(component.errorMessage).toBe('Utilisateur non connecté.');
  });

  it('should handle error when ticketService fails', () => {
    // Arrange
    userStoreService.getUser.and.returnValue(of(mockUserState));
    ticketService.searches.and.returnValue(throwError(() => new Error('Service error')));

    // Act
    fixture.detectChanges();

    // Assert
    expect(userStoreService.getUser).toHaveBeenCalled();
    expect(ticketService.searches).toHaveBeenCalledWith({ userId: mockUser.id }, { gain: true });
    expect(component.userGains).toEqual([]);
    expect(component.errorMessage).toBe('Une erreur est survenue lors du chargement des gains.');
  });
});
