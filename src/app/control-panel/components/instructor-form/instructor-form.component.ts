import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

import { InstructorService } from '../../services/instructor.service';
import { Instructor } from '../../interfaces';
import { User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-instructor-form',
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.css']
})
export class InstructorFormComponent implements OnInit {
  instructorId: string = '';
  instructor: Instructor | undefined;
  users: User[] = [];

  instructorForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<InstructorFormComponent>,
    private instructorService: InstructorService,
    private authService: AuthService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    // Crear el formulario con sus controles y validaciones
    this.instructorForm = this.fb.group({
      imgUrl: ['', [Validators.required]],
      title: ['', [Validators.required]],
      user: ['', [Validators.required]],
      status: [true]
    });
  }

  ngOnInit(): void {
    // Obtener la lista de usuarios
    this.authService.usersList().subscribe((users: User[]) => {
      this.users = users;

      // Si se está editando un instructor, buscarlo por id y cargar sus datos en el formulario
      if (this.instructorId) {
        this.instructorService.findById(this.instructorId).subscribe((instructor: Instructor) => {
          this.instructor = instructor;
          this.instructorForm.patchValue({
            imgUrl: instructor.imgUrl,
            title: instructor.title,
            user: instructor.user?.id,
            status: instructor.status.toString() // Convertir el valor booleano a cadena de texto
          });
        });
      } else {
        // Si se está creando un nuevo instructor, seleccionar al usuario actual como el creador del instructor
        const instructorUser = this.authService.currentUser?.id;
        if (instructorUser) {
          const instructorIndex = this.users.findIndex(user => user.id === instructorUser);
          if (instructorIndex !== -1) {
            this.instructorForm.patchValue({
              user: this.users[instructorIndex].id
            });
          }
        }
        // Remover el control 'status' para un nuevo instructor
        this.instructorForm.removeControl('status');
      }
    });
  }

  saveInstructor() {
    // Si el formulario es inválido, no hacer nada
    if (this.instructorForm.invalid) {
      return;
    }

    const formValue = this.instructorForm.value;

    // Crear un objeto con los datos del instructor a guardar
    let instructor: Partial<Instructor> = {
      imgUrl: formValue.imgUrl,
      title: formValue.title,
      user: formValue.user
    };

    // Si se está editando un instructor, agregar el id y el estado al objeto instructor
    if (this.instructorId) {
      instructor = {
        ...instructor,
        idInstructor: this.instructorId,
        status: formValue.status === 'true'
      };

      // Actualizar el instructor en la base de datos
      this.instructorService.updateById(this.instructorId, instructor as Instructor).subscribe({
        next: () => {
          // Mostrar un mensaje de éxito y cerrar el diálogo
          this.snackBar.open('Instructor guardado', 'OK', {
            duration: 3000
          }).onAction().subscribe(() => {
            this.dialogRef.close(true);
          });
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error al guardar el instructor:', error);
          // Mostrar un mensaje de error
          this.snackBar.open('Error al guardar el instructor', 'OK', {
            duration: 3000
          });
        }
      });
    } else {
      // Crear un nuevo instructor en la base de datos
      this.instructorService.create(instructor as Instructor).subscribe({
        next: () => {
          // Mostrar un mensaje de éxito y cerrar el diálogo
          this.snackBar.open('Instructor guardado', 'OK', {
            duration: 3000
          }).onAction().subscribe(() => {
            this.dialogRef.close(true);
          });
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error al guardar el instructor:', error);
          // Mostrar un mensaje de error
          this.snackBar.open('Error al guardar el instructor', 'OK', {
            duration: 3000
          });
        }
      });
    }
  }

  closeModal(): void {
    // Cerrar el diálogo sin guardar cambios
    this.dialogRef.close(false);
  }
}
