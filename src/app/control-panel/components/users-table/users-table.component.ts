import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
    email: 'Correo',
    fullName: 'Nombre completo',
    roles: 'Roles'
  };

  displayedColumns: string[] = Object.keys(this.columnLabels);

  filterValue: string = '';
  filteredUsers: User[] = [];

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

  showUserId(userId: string) {
    console.log('User ID:', userId);
  }
}
