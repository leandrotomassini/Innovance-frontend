import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Course } from '../../interfaces';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {
  courseId: string = '';
  courseForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CourseFormComponent>,
    private coursesService: CoursesService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { courseId: string }
  ) {
    this.courseId = data.courseId;
    this.courseForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      slug: ['', [Validators.required]],
      logo: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.courseId) {
      this.coursesService.findById(this.courseId).subscribe((course: Course) => {
        this.courseForm.patchValue(course);
      });
    }
  }

  saveCourse(): void {
    if (this.courseForm.invalid) {
      return;
    }

    const formValue = this.courseForm.value;

    let course: Course = {
      title: formValue.title,
      description: formValue.description,
      slug: formValue.slug,
      logo: formValue.logo
    };

    if (this.courseId) {
      course.id = this.courseId;
      this.coursesService.updateById(this.courseId, course).subscribe({
        next: () => {
          this.snackBar.open('Curso guardado', 'OK', {
            duration: 3000
          }).onAction().subscribe(() => {
            this.dialogRef.close(true);
          });
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error al guardar el curso:', error);
          this.snackBar.open('Error al guardar el curso', 'OK', {
            duration: 3000
          });
        }
      });
    } else {
      this.coursesService.create(course).subscribe({
        next: () => {
          this.snackBar.open('Curso guardado', 'OK', {
            duration: 3000
          }).onAction().subscribe(() => {
            this.dialogRef.close(true);
          });
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error al guardar el curso:', error);
          this.snackBar.open('Error al guardar el curso', 'OK', {
            duration: 3000
          });
        }
      });
    }
  }

  closeModal(): void {
    this.dialogRef.close(false);
  }
}
