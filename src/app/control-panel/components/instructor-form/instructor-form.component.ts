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
    this.instructorForm = this.fb.group({
      imgUrl: ['', [Validators.required]],
      title: ['', [Validators.required]],
      status: [true],
      user: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.authService.usersList().subscribe((users: User[]) => {
      this.users = users;

      if (this.instructorId) {
        this.instructorService.findById(this.instructorId).subscribe((instructor: Instructor) => {
          this.instructor = instructor;
          this.instructorForm.patchValue({
            imgUrl: instructor.imgUrl,
            title: instructor.title,
            status: instructor.status.toString(),
            user: instructor.user?.id
          });
        });
      } else {
        const instructorUser = this.authService.currentUser?.id;
        if (instructorUser) {
          const instructorIndex = this.users.findIndex(user => user.id === instructorUser);
          if (instructorIndex !== -1) {
            this.instructorForm.patchValue({
              user: this.users[instructorIndex].id
            });
          }
        }
      }
    });
  }

  saveInstructor() {
    if (this.instructorForm.invalid) {
      return;
    }

    const formValue = this.instructorForm.value;

    const instructor: Instructor = {
      idInstructor: this.instructorId || '',
      imgUrl: formValue.imgUrl,
      title: formValue.title,
      status: formValue.status === 'true',
      user: formValue.user
    };

    const saveObservable = this.instructorId
      ? this.instructorService.updateById(this.instructorId, instructor)
      : this.instructorService.create(instructor);

      saveObservable.subscribe({
        next: () => {
          this.snackBar.open('Instructor guardado', 'OK', {
            duration: 3000
          }).onAction().subscribe(() => {
            this.dialogRef.close(true);
          });
          this.dialogRef.close(true); // Agregar esta línea
        },
        error: (error) => {
          console.error('Error al guardar el instructor:', error);
          this.snackBar.open('Error al guardar el instructor', 'OK', {
            duration: 3000
          });
        }
      });
      
      
  }

  closeModal(): void {
    this.dialogRef.close(false);
  }
}
