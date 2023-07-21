import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { CourseSectionService } from '../../services';
import { CourseSection } from '../../interfaces';

@Component({
  selector: 'app-course-sections',
  templateUrl: './course-sections.component.html',
  styleUrls: ['./course-sections.component.css']
})
export class CourseSectionsComponent implements OnInit, OnChanges {

  @Input() courseId: string = '';
  sectionsCourse: CourseSection[] = [];

  constructor(private courseSectionService: CourseSectionService) { }

  ngOnInit(): void {
    this.fetchSectionsByCourseId(); // Actualizar las secciones al iniciar el componente
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courseId'] && !changes['courseId'].isFirstChange()) {
      this.fetchSectionsByCourseId(); // Actualizar la lista de secciones al cambiar el courseId
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

  removeSection() {
    console.log('borrar seccion');
  }
}
