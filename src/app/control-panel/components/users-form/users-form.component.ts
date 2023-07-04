import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {

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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.findOneById(this.data.userId).subscribe(
      (user: User) => {
        this.user = user;
        console.log(this.user);
      },
      (error: any) => {
        console.log('Error retrieving user:', error);
      }
    );
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
