import { Component, OnInit } from '@angular/core';
import { CourseInstructorService } from '../../services/course-instructor.service';
import { CourseInstructor } from '../../interfaces/course-instructor.interface';
import Swal from 'sweetalert2';


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
    fullName: 'Nombre Completo',
    title: 'Título',
    action: 'Quitar instructor'
  };

  displayedColumns: string[] = Object.keys(this.columnLabels);

  constructor(private courseInstructorService: CourseInstructorService) { }

  ngOnInit(): void {
    this.courseInstructorService
      .findByCourseId('4287d02c-f54c-4ed1-be13-b5a315fd34d5')
      .subscribe({
        next: (courseInstructors: CourseInstructor[]) => {
          this.courseInstructors = courseInstructors;
          this.filteredCourseInstructors = courseInstructors;
        },
        error: (error: any) => {
          console.log(error);
        }
      });
  }

  applyFilter(): void {
    const filterText = this.filterValue.trim().toLowerCase();
    if (filterText === '') {
      this.filteredCourseInstructors = this.courseInstructors;
    } else {
      this.filteredCourseInstructors = this.courseInstructors.filter(
        (courseInstructor: CourseInstructor) =>
          courseInstructor.instructor.user.fullName.toLowerCase().includes(filterText) ||
          courseInstructor.instructor.title.toLowerCase().includes(filterText)
      );
    }
  }


  addInstructor() {

  }

  removeInstructor(idCourseInstructor: string, fullName: string) {
    Swal.fire({
      title: '¿Estás seguro de quitarlo de este curso?',
      html: `Se quitará al instructor <strong>${fullName}</strong>. ¿Deseas continuar?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseInstructorService.removeById(idCourseInstructor)
          .subscribe({
            next: () => {
              this.courseInstructorService.findByCourseId('4287d02c-f54c-4ed1-be13-b5a315fd34d5')
                .subscribe({
                  next: (courseInstructors: CourseInstructor[]) => {
                    this.courseInstructors = courseInstructors;
                    this.filteredCourseInstructors = courseInstructors;
                  },
                  error: (error: any) => {
                    console.log(error);
                  }
                });
            },
            error: (error: any) => {
              console.log(error);
            }
          });
      }
    });
  }


}
