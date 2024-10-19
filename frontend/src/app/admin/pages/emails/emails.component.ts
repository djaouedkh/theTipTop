import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { AgeGroup } from '../../../../../../backend/src/use-cases/stats/enums/age-group.enum';
import { Gender } from '../../../../../../backend/src/use-cases/stats/enums/gender.enum';
import { UserGetDto } from '../../../../../../backend/src/users/dtos/user-get.dto';
import { UserFilterDto } from '../../../../../../backend/src/users/dtos/user-filter.dto';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
})
export class EmailsComponent implements OnInit {
  users: UserGetDto[] = [];
  isLoading = false;
  errorMessage: string | null = null;

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

  // Variable to hold the selected option from the third select dropdown
  selectedFilterOption: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Optionally, load all users at first
    this.filterUsers();
  }

  // Method to trigger filtering based on selected criteria
  filterUsers(): void {
    // Reset the specific filters for tickets
    this.selectedFilters.hasUnclaimedTickets = undefined;
    this.selectedFilters.hasNeverParticipated = undefined;

    // Set the appropriate filter based on the selected option
    if (this.selectedFilterOption === 'hasUnclaimedTickets') {
      this.selectedFilters.hasUnclaimedTickets = true;
      this.selectedFilters.hasNeverParticipated = false;
    }
    if (this.selectedFilterOption === 'hasNeverParticipated') {
      this.selectedFilters.hasNeverParticipated = true;
      this.selectedFilters.hasUnclaimedTickets = false;
    }

    this.isLoading = true;

    this.userService.filter(this.selectedFilters).subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      },
    });
  }
}
