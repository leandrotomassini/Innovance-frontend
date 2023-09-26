import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Course, CourseSection } from 'src/app/studio/interfaces';
import { CourseSectionService, CoursesService } from 'src/app/studio/services';

@Component({
  selector: 'app-view-course-video',
  templateUrl: './view-course-video.component.html',
  styleUrls: ['./view-course-video.component.css'],
})
export class ViewCourseVideoComponent implements OnInit {
  isMenuOpen = false;
  cursoSlug: string = '';
  slugVideo: string = '';

  course: Course = {
    description: '',
    frontPage: '',
    logo: '',
    slug: '',
    title: '',
    idCourse: '',
  };

  sectionsCourse: CourseSection[] = [];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private sectionService: CourseSectionService
  ) {}

  ngOnInit(): void {
    this.getInfoCourse();
  }

  toggleSidenav(event: Event) {
    this.isMenuOpen = !this.isMenuOpen;
    event.stopPropagation();
  }

  closeSidenav() {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }

  getInfoCourse() {
    this.route.params.subscribe((params) => {
      this.cursoSlug = params['slugCurso'];
      this.slugVideo = params['slugVideo'];

      this.coursesService.findBySlug(this.cursoSlug).subscribe((course) => {
        this.course = course;
        this.sectionService
          .findByCourseId(course.idCourse!)
          .subscribe((sections) => {
            this.sectionsCourse = sections;
          });
      });

      console.log('Video:', this.slugVideo);
    });
  }
}
