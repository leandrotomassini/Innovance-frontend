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
    });
  }

  ngOnInit(): void {
    if (this.instructorId) {
      this.instructorService.findById(this.instructorId).subscribe((instructor: Instructor) => {
        this.instructor = instructor;
        this.instructorForm.patchValue({
          imgUrl: instructor.imgUrl,
          title: instructor.title
        });
      });
    }
  }

  saveInstructor() {
    const updatedInstructor: Instructor = {
      idInstructor: this.instructorId,
      imgUrl: this.instructorForm.value.imgUrl,
      title: this.instructorForm.value.title,
      status: this.instructor?.status || false,
      user: this.instructor?.user || {} as User
    };

    console.log('Instructor guardado:', updatedInstructor);

    // Mostrar el mensaje de "Usuario guardado" durante 3 segundos
    this.snackBar.open('Usuario guardado', '', {
      duration: 3000
    });

    this.dialogRef.close(true); // Cerrar el modal después de guardar
  }

  closeModal(): void {
    this.dialogRef.close(false);
  }
}
