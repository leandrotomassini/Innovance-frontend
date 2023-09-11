import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CoursesService } from '../../services';
import { Course } from '../../interfaces';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  @Input() courseSlug: string = '';

  courseForm: FormGroup;
  course!: Course;

  constructor(
    private fb: FormBuilder,
    private courseService: CoursesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      slug: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\\\\-]+$/)]],
      logo: ['', [Validators.required]],
      frontPage: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.courseSlug !== 'nuevo-curso') {
      this.courseService.findBySlug(this.courseSlug)
        .subscribe((course) => {
          this.course = course;
          this.courseForm.patchValue(course);
        });
    }
  }

  saveCourse() {
    const courseData = this.courseForm.value;
    if (this.courseSlug !== 'nuevo-curso') {
      this.courseService.updateById(this.course.idCourse!, courseData)
        .subscribe(() => {
          this.router.navigate([`/studio/cursos/${this.courseSlug}`]);
          this.showUpdateSuccessToast();
        });
    } else {
      this.courseService.create(courseData)
        .subscribe((newCourse) => {
          this.router.navigateByUrl(`/studio/cursos/${newCourse.slug}`)
            .then(() => {
              window.location.reload();
              this.showCreateSuccessToast();
            });
        });
    }
  }

  private showUpdateSuccessToast() {
    this.snackBar.open('Curso actualizado correctamente', 'OK', {
      duration: 3000
    });
  }

  private showCreateSuccessToast() {
    this.snackBar.open('Curso creado correctamente', 'OK', {
      duration: 3000
    });
  }
}
