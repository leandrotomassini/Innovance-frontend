import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Course } from '../../interfaces';
import { CoursesService } from '../../services/courses.service';
import { CourseFormComponent } from '../course-form/course-form.component';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements OnInit {
  courses: Course[] = [];
  filteredCourses: Course[] = [];
  displayedColumns: string[] = ['logo', 'title', 'description', 'slug', 'actions'];

  filterValue = '';

  columnLabels: { [key: string]: string } = {
    logo: 'Logo',
    title: 'Título',
    description: 'Descripción',
    slug: 'Slug',
    actions: 'Acciones'
  };

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.coursesService.findAll().subscribe((courses: Course[]) => {
      this.courses = courses;
      this.applyFilter();
    });
  }

  applyFilter(): void {
    const filter = this.filterValue.trim().toLowerCase();
    if (filter === '') {
      this.filteredCourses = this.courses;
    } else {
      this.filteredCourses = this.courses.filter((course: Course) => {
        return (
          course.title.toLowerCase().includes(filter) ||
          course.description.toLowerCase().includes(filter) ||
          course.slug.toLowerCase().includes(filter)
        );
      });
    }
  }

  openCourseForm(courseId: string): void {
    const dialogRef = this.dialog.open(CourseFormComponent, {
      width: '600px',
      data: { courseId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
