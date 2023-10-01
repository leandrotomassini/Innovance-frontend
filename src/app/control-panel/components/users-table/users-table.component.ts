import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { UsersFormComponent } from '../users-form/users-form.component';
import { User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

// Definición de una interfaz que extiende la interfaz User y permite un índice de tipo string
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

  // Etiquetas de las columnas de la tabla
  columnLabels: { [key: string]: string } = {
    email: 'Email',
    fullName: 'Nombre completo',
    roles: 'Roles'
  };

  // Columnas a mostrar en la tabla (se obtienen a partir de las etiquetas de las columnas)
  displayedColumns: string[] = Object.keys(this.columnLabels);

  // Valor del filtro de búsqueda
  filterValue: string = '';

  // Usuarios filtrados (resultado de la búsqueda)
  filteredUsers: User[] = [];

  constructor(
    public dialog: MatDialog, // Servicio para abrir un diálogo/modal
    private authService: AuthService, // Servicio de autenticación
    private _snackBar: MatSnackBar // Servicio para mostrar mensajes emergentes
  ) { }

  // Método que se ejecuta cuando hay cambios en la propiedad 'users'
  ngOnChanges(changes: SimpleChanges) {
    if (changes['users']) {
      // Se copia la lista de usuarios para realizar la filtración y ordenación sin modificar la lista original
      this.filteredUsers = this.users.slice();

      this.sortUsersByEmail(); // Ordenar usuarios por email cuando cambia la lista de usuarios
    }
  }

  // Método para buscar usuarios en función del valor del filtro
  searchUsers() {
    const filter = this.filterValue.trim().toLowerCase();

    this.filteredUsers = this.users.filter((user: UserWithIndexSignature) => {
      // Filtrar usuarios por correo electrónico, nombre completo y roles
      return (
        user.email.toLowerCase().includes(filter) ||
        user.fullName.toLowerCase().includes(filter) ||
        user.roles.some((role: string) => role.toLowerCase().includes(filter))
      );
    });

    this.sortUsersByEmail(); // Ordenar usuarios filtrados por email
  }

  // Método para ordenar los usuarios por correo electrónico
  sortUsersByEmail() {
    this.filteredUsers.sort((a, b) => a.email.localeCompare(b.email));
  }

  // Método para obtener el valor de una columna específica de un usuario
  getColumnValue(user: UserWithIndexSignature, column: string): string {
    if (column === 'roles') {
      // Si la columna es 'roles', se unen los roles en un string separados por comas
      return user.roles.join(', ');
    }
    // Para otras columnas, se devuelve el valor correspondiente del usuario
    return user[column];
  }

  // Método para abrir un modal/dialogo para editar un usuario
  openModal(userId: string) {
    const dialogRef = this.dialog.open(UsersFormComponent, {
      width: '400px',
      data: { userId } // Se pasa el ID delusuario al diálogo/modal
    });

    // Suscribirse al evento 'afterClosed' del diálogo/modal
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si se obtiene un resultado del diálogo/modal, se recargan los usuarios
        this.reloadUsers();
        // Se muestra un mensaje emergente indicando que el usuario ha sido guardado
        this.openSnackBar('Usuario guardado', 'ok');
      }
    });
  }

  // Método para recargar la lista de usuarios
  reloadUsers() {
    // Llamada al servicio de autenticación para obtener la lista de usuarios
    this.authService.usersList().subscribe({
      next: (users) => {
        // Actualizar la lista de usuarios y la lista de usuarios filtrados con los nuevos datos
        this.users = users;
        this.filteredUsers = users.slice();
        this.sortUsersByEmail(); // Ordenar usuarios por email
      },
      error: (error) => {
        console.error('Error while fetching users:', error);
      }
    });
  }

  // Método para mostrar un mensaje emergente
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000 // Duración del mensaje emergente (en milisegundos)
    });
  }
}
