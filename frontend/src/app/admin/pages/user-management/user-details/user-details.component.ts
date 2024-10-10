// user-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { UserService } from '../../../core/services/user.service';
// import { UserGetDto } from '../../../../../backend/src/users/dtos/user-get.dto';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {
    // user: UserGetDto | null = null;
    user: any | null = null;

    constructor(
        private route: ActivatedRoute,
        // private userService: UserService
    ) {}

    ngOnInit(): void {
        const userId = Number(this.route.snapshot.paramMap.get('id'));
        // this.userService.getUserById(userId).subscribe(user => this.user = user);
    }

    onDeleteUser(): void {
        if (this.user) {
            // this.userService.deleteUser(this.user.id).subscribe(() => alert('Utilisateur supprimé.'));
        }
    }
}
