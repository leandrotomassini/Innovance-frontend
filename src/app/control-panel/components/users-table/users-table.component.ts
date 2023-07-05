import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UsersFormComponent } from '../users-form/users-form.component';
import { User } from 'src/app/auth/interfaces';

interface UserWithIndexSignature extends User {
  [key: string]: any;
}

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnChanges {
  @Input() users: User[] = [];

  columnLabels: { [key: string]: string } = {
    email: 'Email',
    fullName: 'Full Name',
    roles: 'Roles'
  };

  displayedColumns: string[] = Object.keys(this.columnLabels);

  filterValue: string = '';
  filteredUsers: User[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['users']) {
      this.filteredUsers = this.users.slice();
    }
  }

  searchUsers() {
    const filter = this.filterValue.trim().toLowerCase();
    this.filteredUsers = this.users.filter((user: UserWithIndexSignature) => {
      return (
        user.email.toLowerCase().includes(filter) ||
        user.fullName.toLowerCase().includes(filter) ||
        user.roles.some((role: string) => role.toLowerCase().includes(filter))
      );
    });
  }

  getColumnValue(user: UserWithIndexSignature, column: string): string {
    if (column === 'roles') {
      return user.roles.join(', ');
    }
    return user[column];
  }

  openModal(userId: string) {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      width: '400px',
      data: { userId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
