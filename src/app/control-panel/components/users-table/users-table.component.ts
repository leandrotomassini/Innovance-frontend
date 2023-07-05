import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { UsersFormComponent } from '../users-form/users-form.component';
import { User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

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

  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['users']) {
      this.filteredUsers = this.users.slice();
      this.sortUsersByEmail(); // Ordenar por email cuando cambia la lista de usuarios
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
    this.sortUsersByEmail(); // Volver a ordenar por email después de filtrar
  }

  sortUsersByEmail() {
    this.filteredUsers.sort((a, b) => a.email.localeCompare(b.email));
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
      if (result) {
        this.reloadUsers();
        this.openSnackBar('Usuario guardado', 'ok');
      }
    });
  }

  // Función para recargar los usuarios después de cerrar el diálogo de edición
  reloadUsers() {
    this.authService.usersList().subscribe(
      (users) => {
        this.users = users;
        this.filteredUsers = users.slice();
        this.sortUsersByEmail(); // Volver a ordenar por email después de recargar los usuarios
      },
      (error) => {
        console.error('Error while fetching users:', error);
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,  {
      duration: 3000
    });
  }
}
