import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { Course } from '../../interfaces';
import { CoursesService } from '../../services/courses.service';

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
    private router: Router
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

  openCourseForm(courseSlug: string): void {
    if (courseSlug == '') {
      this.router.navigateByUrl(`/studio/cursos/nuevo-curso`);
    } else {
      this.router.navigateByUrl(`/studio/cursos/${courseSlug}`);
    }
  }
}
