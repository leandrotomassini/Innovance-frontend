import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { SectionFormComponent } from '../section-form/section-form.component';
import { CoursesService } from '../../services';

@Component({
  selector: 'app-course-layout',
  templateUrl: './course-layout.component.html',
  styleUrls: ['./course-layout.component.css']
})
export class CourseLayoutComponent implements OnInit {

  courseSlug: string = '';
  idCourse: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CoursesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.courseSlug = this.activatedRoute.snapshot.params['slug'];

    if (this.courseSlug !== 'nuevo-curso') {
      this.courseService.findBySlug(this.courseSlug)
        .pipe(
          map(course => course.idCourse)
        )
        .subscribe(idCourse => {
          this.idCourse = idCourse!;
        });
    }
  }

  arrowBack() {
    this.router.navigate(['/studio/cursos/']);
  }

  addSection() {
    const dialogRef = this.dialog.open(SectionFormComponent, {
      data: { isNewSection: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal cerrado', result);
    });
  }
}
