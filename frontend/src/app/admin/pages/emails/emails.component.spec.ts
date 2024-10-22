// src/app/admin/pages/emails/emails.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailsComponent } from './emails.component';
import { UserService } from '../../../core/services/user.service';
import { EmailStoreService } from '../../../core/stores/emails/email-store.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { UserGetDto } from '../../../../../../backend/src/users/dtos/user-get.dto';
import { FormsModule } from '@angular/forms';

class MockUserService {
  filter() {
    return of([{ id: 1, firstname: 'John', lastname: 'Doe', email: 'john@example.com' }] as UserGetDto[]);
  }
}

class MockEmailStoreService {
  setSelectedUsers() {}
}

describe('EmailsComponent', () => {
  let component: EmailsComponent;
  let fixture: ComponentFixture<EmailsComponent>;
  let emailStoreService: EmailStoreService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailsComponent],
      imports: [RouterTestingModule, FormsModule], // Added FormsModule here
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: EmailStoreService, useClass: MockEmailStoreService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailsComponent);
    component = fixture.componentInstance;
    emailStoreService = TestBed.inject(EmailStoreService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should call setSelectedUsers and navigate to email-send on navigateToEmailSend', () => {
    spyOn(emailStoreService, 'setSelectedUsers');
    spyOn(router, 'navigate');

    component.users = [
      { id: 1, firstname: 'John', lastname: 'Doe', email: 'john@example.com' } as UserGetDto,
    ];
    component.selectedUsers = [true];

    component.navigateToEmailSend();

    expect(emailStoreService.setSelectedUsers).toHaveBeenCalledWith([component.users[0]]);
    expect(router.navigate).toHaveBeenCalledWith(['/admin/email-send']);
  });
});
