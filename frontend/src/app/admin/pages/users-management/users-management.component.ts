import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { TicketService } from '../../../core/services/ticket.service';
import { ContestService } from '../../../core/services/contest.service';
import { UserGetDto } from '../../../../../../backend/src/users/dtos/user-get.dto';
import { TicketGetDto, TicketIncludeDto, TicketSearchDto } from '../../../../../../backend/src/tickets/dtos/ticket-get.dto';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
})
export class UsersManagementComponent implements OnInit {
  users: UserGetDto[] = [];
  userTickets: TicketGetDto[] = [];
  selectedUser: UserGetDto | null = null;
  isContestValid = false;

  constructor(
    private userService: UserService,
    private ticketService: TicketService,
    private contestService: ContestService
  ) {}

  ngOnInit(): void {
    this.checkContestValidity();
    this.loadUsers();
  }

  checkContestValidity(): void {
    this.contestService.isValid().subscribe({
      next: (isValid) => {
        this.isContestValid = isValid;
      },
      error: (err) => console.error("Erreur lors de la vérification de la validité du concours : ", err),
    });
  }

  loadUsers(): void {
    this.userService.getAll().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error("Erreur lors du chargement des utilisateurs : ", err),
    });
  }

  selectUser(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const userId = selectElement.value === 'none' ? null : Number(selectElement.value);

    if (userId === null) {
      this.selectedUser = null;
      this.userTickets = [];
    } else {
      const user = this.users.find(u => u.id === userId) || null;
      this.selectedUser = user;
      
      if (user) {
        this.loadUserTickets(user.id);
      }
    }
  }

  loadUserTickets(userId: number): void {
    const criteria: TicketSearchDto = { userId };
    const includeOptions: TicketIncludeDto = { gain: true };
    
    this.ticketService.searches(criteria, includeOptions).subscribe({
      next: (data: TicketGetDto[]) => {
        this.userTickets = Array.isArray(data) ? data : [];
      },
      error: (err) => console.error("Erreur lors du chargement des tickets : ", err),
    });
  }

  markAsDelivered(ticketId: number): void {
    this.ticketService.update(ticketId, { isDelivered: true }).subscribe({
      next: () => {
        if (this.selectedUser) {
          this.loadUserTickets(this.selectedUser.id);
        }
      },
      error: (err) => console.error("Erreur lors de la mise à jour du ticket : ", err),
    });
  }
}
