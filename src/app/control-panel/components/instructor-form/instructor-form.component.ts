import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstructorService } from '../../services/instructor.service';
import { Instructor } from '../../interfaces';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/auth/interfaces';

@Component({
  selector: 'app-instructor-form',
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.css']
})
export class InstructorFormComponent implements OnInit {
  instructorId: string = '';
  instructor: Instructor | undefined;

  instructorForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<InstructorFormComponent>,
    private instructorService: InstructorService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.instructorForm = this.fb.group({
      imgUrl: ['', [Validators.required]],
      title: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.instructorId) {
      this.instructorService.findById(this.instructorId).subscribe((instructor: Instructor) => {
        this.instructor = instructor;
        this.instructorForm.patchValue({
          imgUrl: instructor.imgUrl,
          title: instructor.title,
          status: instructor.status.toString(), // Convierte el booleano a string
        });
      });
    }
  }

  saveInstructor() {
    if (this.instructorId) {
      // Actualizar instructor existente
      const updatedInstructor: Instructor = {
        idInstructor: this.instructorId,
        imgUrl: this.instructorForm.value.imgUrl,
        title: this.instructorForm.value.title,
        status: this.instructorForm.value.status === 'true', // Convierte el string a booleano
        user: this.instructor?.user.id
      };

      this.instructorService.updateById(this.instructorId, updatedInstructor).subscribe(() => {
        console.log('Instructor guardado:', updatedInstructor);

        // Mostrar el mensaje de "Usuario guardado" durante 3 segundos con opción de cerrar
        this.snackBar.open('Usuario guardado', 'OK', {
          duration: 3000
        }).onAction().subscribe(() => {
          this.dialogRef.close(true); // Cerrar el modal después de guardar
        });
      });
    } else {
      // Agregar nuevo instructor
      const newInstructor: Instructor = {
        idInstructor: '',
        imgUrl: this.instructorForm.value.imgUrl,
        title: this.instructorForm.value.title,
        status: this.instructorForm.value.status === 'true', // Convierte el string a booleano
        user: '' // El usuario se asigna en el backend
      };

      this.instructorService.create(newInstructor).subscribe((instructor: Instructor) => {
        console.log('Instructor creado:', instructor);

        // Mostrar el mensaje de "Usuario guardado" durante 3 segundos con opción de cerrar
        this.snackBar.open('Usuario guardado', 'OK', {
          duration: 3000
        }).onAction().subscribe(() => {
          this.dialogRef.close(true); // Cerrar el modal después de guardar
        });
      });
    }
  }

  closeModal(): void {
    this.dialogRef.close(false);
  }
}
