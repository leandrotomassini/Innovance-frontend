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
    if (this.courseId) {
      this.fetchSectionsByCourseId();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courseId'] && !changes['courseId'].isFirstChange()) {
      this.fetchSectionsByCourseId();
    }
  }

  fetchSectionsByCourseId(): void {
    this.courseSectionService.findByCourseId(this.courseId)
      .subscribe((sectionsCourse) => {
        this.sectionsCourse = sectionsCourse.map((section) => {
          return {
            ...section,
            panelOpenState: true
          };
        });
        this.sectionsCourse.sort((a, b) => a.sectionNumber.localeCompare(b.sectionNumber));
        console.log('Secciones del curso:', this.sectionsCourse);
      });
  }
}
