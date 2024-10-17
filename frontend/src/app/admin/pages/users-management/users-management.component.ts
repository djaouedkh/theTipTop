import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { TicketService } from '../../../core/services/ticket.service';
import { ContestService } from '../../../core/services/contest.service';
import { UserGetDto } from '../../../../../../backend/src/users/dtos/user-get.dto';
import { TicketGetDto, TicketIncludeDto, TicketSearchDto } from '../../../../../../backend/src/tickets/dtos/ticket-get.dto';
import { ContestGetDto } from '../../../../../../backend/src/contests/dtos/contest-get.dto';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
})
export class UsersManagementComponent implements OnInit {
  contests: ContestGetDto[] = [];
  users: UserGetDto[] = [];
  userTickets: TicketGetDto[] = [];
  selectedContest: number | null = null;
  selectedUser: UserGetDto | null = null;

  constructor(
    private userService: UserService,
    private ticketService: TicketService,
    private contestService: ContestService
  ) {}

  ngOnInit(): void {
    this.loadContests();
  }

  loadContests(): void {
    this.contestService.getAllValid().subscribe({
      next: (data) => (this.contests = data),
      error: (err) => console.error("Erreur lors du chargement des concours : ", err),
    });
  }

  selectContest(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const contestId = selectElement.value === 'none' ? null : Number(selectElement.value);
    
    if (contestId === null) {
      this.selectedContest = null;
      this.selectedUser = null;
      this.users = [];
      this.userTickets = [];
    } else {
      this.selectedContest = contestId;
      this.loadUsers(); // Charge les utilisateurs en fonction du concours sélectionné
      this.selectedUser = null; // Réinitialise l’utilisateur
      this.userTickets = []; // Vide les tickets
    }
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
      this.userTickets = []; // Vide les tickets si aucun utilisateur sélectionné
    } else {
      const user = this.users.find(u => u.id === userId) || null;
      this.selectedUser = user;
      
      if (user && this.selectedContest) {
        // Charge les tickets en fonction de l'utilisateur et du concours
        this.loadUserTickets(user.id, this.selectedContest);
      }
    }
  }

  loadUserTickets(userId: number, contestId: number): void {
    const criteria: TicketSearchDto = { userId, contestId };
    const includeOptions: TicketIncludeDto = { gain: true }; // Inclure les données de gain
    
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
        if (this.selectedUser && this.selectedContest) {
          this.loadUserTickets(this.selectedUser.id, this.selectedContest);
        }
      },
      error: (err) => console.error("Erreur lors de la mise à jour du ticket : ", err),
    });
  }
}
