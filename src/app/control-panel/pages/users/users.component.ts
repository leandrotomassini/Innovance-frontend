import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/app/auth/interfaces';

import { AuthService } from 'src/app/auth/services/auth.service';





@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private authService: AuthService = inject(AuthService);
  users: User[] = [];

  ngOnInit(): void {
    this.authService.usersList().subscribe({
      next: (users) => this.users = users,
      error: (error) => console.error(error)
    });
  }


}
