import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  subscription: Subscription | undefined;

  user: User = {
    id: '',
    fullName: '',
    email: '',
    isActive: false,
    roles: [],
  };

  constructor(
    public dialogRef: MatDialogRef<UsersFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { userId: string },
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      isActive: [false, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.subscription = this.authService.findOneById(this.data.userId)
      .pipe(
        switchMap((user: User) => {
          this.user = user;
          this.userForm.patchValue({
            email: user.email,
            fullName: user.fullName,
            isActive: user.isActive
          });
          return this.authService.findOneById(this.data.userId);
        })
      )
      .subscribe();
  }

  closeModal(): void {
    this.dialogRef.close(false);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  saveUser() {
    this.user.fullName = this.userForm.value.fullName;
    this.user.email = this.userForm.value.email;
    this.user.isActive = this.userForm.value.isActive;

    this.authService.updateUser(this.user.id, this.user)
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }
}
