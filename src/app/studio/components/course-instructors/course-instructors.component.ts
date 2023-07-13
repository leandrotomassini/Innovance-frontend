import { Component, OnInit } from '@angular/core';
import { CourseInstructorService } from '../../services/course-instructor.service';
import { CourseInstructor } from '../../interfaces/course-instructor.interface';

@Component({
  selector: 'app-course-instructors',
  templateUrl: './course-instructors.component.html',
  styleUrls: ['./course-instructors.component.css']
})
export class CourseInstructorsComponent implements OnInit {
  courseInstructors: CourseInstructor[] = [];
  filteredCourseInstructors: CourseInstructor[] = [];
  filterValue: string = '';

  columnLabels: { [key: string]: string } = {
    imgUrl: 'Foto',
    fullName: 'Nombre Completo'
  };

  displayedColumns: string[] = Object.keys(this.columnLabels);

  constructor(private courseInstructorService: CourseInstructorService) { }

  ngOnInit(): void {
    this.courseInstructorService
      .findByCourseId('4287d02c-f54c-4ed1-be13-b5a315fd34d5')
      .subscribe(
        (courseInstructors: CourseInstructor[]) => {
          this.courseInstructors = courseInstructors;
          this.filteredCourseInstructors = courseInstructors;
          console.log(this.courseInstructors); // Mostrar courseInstructors en la consola
        },
        (error: any) => {
          // Manejar el error aquí
          console.log(error);
        }
      );
  }


  applyFilter(): void {
    const filterText = this.filterValue.trim().toLowerCase();
    if (filterText === '') {
      this.filteredCourseInstructors = this.courseInstructors;
    } else {
      this.filteredCourseInstructors = this.courseInstructors.filter(
        (courseInstructor: CourseInstructor) =>
          courseInstructor.instructor.user.fullName.toLowerCase().includes(filterText)
      );
    }
  }
}
