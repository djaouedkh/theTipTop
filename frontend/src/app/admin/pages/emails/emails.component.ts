import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { AgeGroup } from '../../../../../../backend/src/use-cases/stats/enums/age-group.enum';
import { Gender } from '../../../../../../backend/src/use-cases/stats/enums/gender.enum';
import { UserGetDto } from '../../../../../../backend/src/users/dtos/user-get.dto';
import { UserFilterDto } from '../../../../../../backend/src/users/dtos/user-filter.dto';
import { EmailStoreService } from '../../../core/stores/emails/email-store.service';



@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
})
export class EmailsComponent implements OnInit {
  users: UserGetDto[] = [];
  selectedUsers: boolean[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  emailErrorMessage: string | null = null;

  // Options for the select dropdowns
  ageGroups = Object.values(AgeGroup);
  genders = Object.values(Gender);

  // Model to hold selected filter values
  selectedFilters: UserFilterDto = {
    ageGroup: undefined,
    gender: undefined,
    hasUnclaimedTickets: undefined,
    hasNeverParticipated: undefined,
  };

  // Variable to hold the selected option for ticket status filtering
  selectedFilterOption: string | null = null;

  constructor(
    private userService: UserService,
    private router: Router,
    private emailStore: EmailStoreService, // Injecter le service de stockage d'email
  ) {}

  ngOnInit(): void {
    // Load users at the start
    this.filterUsers();
  }

  // Trigger filtering based on selected criteria
  filterUsers(): void {
    // Apply the specific ticket status filters
    if (this.selectedFilterOption === 'hasUnclaimedTickets') {
      this.selectedFilters.hasUnclaimedTickets = true;
      this.selectedFilters.hasNeverParticipated = false;
    } else if (this.selectedFilterOption === 'hasNeverParticipated') {
      this.selectedFilters.hasNeverParticipated = true;
      this.selectedFilters.hasUnclaimedTickets = false;
    } else {
      this.selectedFilters.hasUnclaimedTickets = undefined;
      this.selectedFilters.hasNeverParticipated = undefined;
    }

    // Clear the selected users list
    this.selectedUsers = [];
    this.isLoading = true;

    // Fetch filtered users from the service
    this.userService.filter(this.selectedFilters).subscribe({
      next: (users) => {
        this.users = users;
        this.selectedUsers = new Array(users.length).fill(true); // All users are checked by default
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      },
    });
  }

  // Select or deselect all users
  selectAllUsers(isSelected: boolean): void {
    this.selectedUsers.fill(isSelected);
  }

  // Navigate to the email sending component with selected users
  navigateToEmailSend(): void {
    // Reset error message
    this.emailErrorMessage = null;

    const usersToEmail = this.users.filter((_, index) => this.selectedUsers[index]);

    // Check if there is at least one selected user
    if (usersToEmail.length === 0) {
      this.emailErrorMessage = 'Veuillez sélectionner au moins un utilisateur pour envoyer un email.';
      return;
    }

    // Mettre à jour le store avec les utilisateurs sélectionnés
    this.emailStore.setSelectedUsers(usersToEmail);

    // Navigate to the email send page
    this.router.navigate(['/admin/email-send']);
  }
}
