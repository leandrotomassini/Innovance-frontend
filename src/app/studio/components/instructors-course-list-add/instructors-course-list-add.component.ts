import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { InstructorService } from '../../../control-panel/services/instructor.service';
import { Instructor } from 'src/app/control-panel/interfaces';
import { CourseInstructorService } from '../../services';
import { CourseInstructor } from '../../interfaces';

interface InstructorWithSelection extends Instructor {
  isSelected: boolean;
}

@Component({
  selector: 'app-instructors-course-list-add',
  templateUrl: './instructors-course-list-add.component.html',
  styleUrls: ['./instructors-course-list-add.component.css']
})
export class InstructorsCourseListAddComponent implements OnInit {

  instructors: InstructorWithSelection[] = [];
  filteredInstructors: InstructorWithSelection[] = [];
  filterValue: string = '';

  columnLabels: { [key: string]: string } = {
    imgUrl: 'Foto',
    fullName: 'Nombre Completo',
    title: 'Título'
  };

  displayedColumns: string[] = Object.keys(this.columnLabels);

  constructor(
    private instructorService: InstructorService,
    private courseInstructorService: CourseInstructorService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { idCourse: string }
  ) { }

  ngOnInit(): void {
    console.log('ID del curso:', this.data.idCourse);

    this.instructorService.findAll()
      .subscribe((instructors: Instructor[]) => {
        this.instructors = instructors.map((instructor: Instructor) => ({
          ...instructor,
          isSelected: false
        }));
        this.loadCourseInstructors();
        this.applyFilter();
      });
  }

  loadCourseInstructors(): void {
    this.courseInstructorService.findByCourseId(this.data.idCourse)
      .subscribe((courseInstructors: CourseInstructor[]) => {
        courseInstructors.forEach((courseInstructor: CourseInstructor) => {
          this.instructors.forEach((instructor: InstructorWithSelection) => {
            if (courseInstructor.instructor.idInstructor === instructor.idInstructor) {
              instructor.isSelected = true;
            }
          });
        });
      });
  }

  applyFilter(): void {
    const filterText = this.filterValue.trim().toLowerCase();
    if (filterText === '') {
      this.filteredInstructors = this.instructors;
    } else {
      this.filteredInstructors = this.instructors
        .filter(
          (instructor: InstructorWithSelection) =>
            instructor.title.toLowerCase().includes(filterText) ||
            instructor.user.fullName.toLowerCase().includes(filterText)
        );
    }
  }

  addInstructor(instructor: Instructor): void {
    if (instructor.isSelected) {
      return;
    }

    const courseId = this.data.idCourse;
    this.courseInstructorService.create(courseId, instructor.idInstructor!)
      .subscribe(() => {
        instructor.isSelected = true;
        this.showSnackBar('Instructor agregado al curso');
      });
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }
}
