import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { CourseInstructorService } from '../../services/course-instructor.service';
import { CourseInstructor } from '../../interfaces/course-instructor.interface';
import { InstructorsCourseListAddComponent } from '../instructors-course-list-add/instructors-course-list-add.component';

@Component({
  selector: 'app-course-instructors',
  templateUrl: './course-instructors.component.html',
  styleUrls: ['./course-instructors.component.css']
})
export class CourseInstructorsComponent implements OnInit, OnChanges {
  @Input() idCourse: string = '';
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

  constructor(
    private courseInstructorService: CourseInstructorService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(): void {
    this.loadData();
  }

  loadData(): void {
    if (this.idCourse) {
      this.courseInstructorService
        .findByCourseId(this.idCourse)
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

  addInstructor(idCourse: string) {
    this.dialog.open(InstructorsCourseListAddComponent, {
      data: {
        idCourse: idCourse
      }
    });
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
        this.courseInstructorService
          .removeById(idCourseInstructor)
          .subscribe({
            next: () => {
              this.loadData();
            },
            error: (error: any) => {
              console.log(error);
            }
          });
      }
    });
  }
}
