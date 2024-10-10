// user-list.component.ts
import { Component, OnInit } from '@angular/core';
// import { UserService } from '../../../core/services/user.service';
// import { UserGetDto } from '../../../../../backend/src/users/dtos/user-get.dto';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
    // users: UserGetDto[] = [];
    users: any[] = [];
    searchQuery: string = '';

    // constructor(private userService: UserService) {}

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        // this.userService.getAllUsers().subscribe(users => this.users = users);
    }

    onSearch(): void {
        // this.userService.searchUsers({ name: this.searchQuery }).subscribe(users => this.users = users);
    }
}
