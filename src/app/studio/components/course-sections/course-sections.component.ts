import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CourseSectionService } from '../../services';
import { CourseSection } from '../../interfaces';
import { SectionFormComponent } from '../section-form/section-form.component';

@Component({
  selector: 'app-course-sections',
  templateUrl: './course-sections.component.html',
  styleUrls: ['./course-sections.component.css']
})
export class CourseSectionsComponent implements OnInit, OnChanges {

  @Input() courseId: string = '';
  sectionsCourse: CourseSection[] = [];

  constructor(
    private courseSectionService: CourseSectionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.fetchSectionsByCourseId();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courseId'] && !changes['courseId'].isFirstChange()) {
      this.fetchSectionsByCourseId();
    }
  }

  fetchSectionsByCourseId(): void {
    if (this.courseId !== '') {
      this.courseSectionService.findByCourseId(this.courseId)
        .subscribe((sectionsCourse) => {
          this.sectionsCourse = sectionsCourse.map((section) => {
            return {
              ...section,
              panelOpenState: true
            };
          });
          this.sectionsCourse.sort((a, b) => a.sectionNumber.localeCompare(b.sectionNumber));
        });
    }
  }

  removeSection(idSecition: string) {
    this.courseSectionService.removeById(idSecition)
      .subscribe(resp => {
        this.fetchSectionsByCourseId();
        this.showSuccessToast('Sección borrada correctamente.');
      });
  }

  addSection() {
    const dialogRef = this.dialog.open(
      SectionFormComponent, {
      data: {
        isNewSection: true,
        idCourse: this.courseId
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      this.fetchSectionsByCourseId();

      if (result) {
        this.showSuccessToast('Sección creada con éxito');
      }

    });
  }

  private showSuccessToast(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000
    });
  }
}
