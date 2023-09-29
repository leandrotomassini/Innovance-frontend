import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import {
  Course,
  CourseInstructor,
  CourseSection,
  CourseVideo,
} from 'src/app/studio/interfaces';
import {
  CourseInstructorService,
  CourseSectionService,
  CourseVideoSectionService,
  CourseVideoService,
  CoursesService,
} from 'src/app/studio/services';

@Component({
  selector: 'app-view-course-video',
  templateUrl: './view-course-video.component.html',
  styleUrls: ['./view-course-video.component.css'],
})
export class ViewCourseVideoComponent implements OnInit {
  isMenuOpen = false;
  cursoSlug: string = '';
  slugVideo: string = '';
  videosList: CourseVideo[] = [];
  instructorsCourseList: CourseInstructor[] = [];

  courseVideo: CourseVideo = {
    description: '',
    link: '',
    number: '',
    previewAnimation: '',
    thumbnailUrl: '',
    title: '',
    url: '',
  };

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
    private sectionService: CourseSectionService,
    private videoSectionService: CourseVideoSectionService,
    private courseVideoService: CourseVideoService,
    private instructorsCourse: CourseInstructorService,
    private sanitizer: DomSanitizer
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
            this.loadVideosForSections();
          });
        this.getInstructorsCourse();
      });

      console.log('Video:', this.slugVideo);
    });
  }

  loadVideosForSections() {
    for (const section of this.sectionsCourse) {
      this.videoSectionService
        .findBySectionId(section.sectionCourseId!)
        .subscribe((videos) => {
          section.videos = videos.map((video) => video.videoCourse);
        });
    }
  }

  viewVideo(idVideo: string) {
    this.courseVideoService.findById(idVideo).subscribe((video) => {
      this.courseVideo = video;
    });
  }

  getInstructorsCourse() {
    this.instructorsCourse
      .findByCourseId(this.course.idCourse!)
      .subscribe((instructors) => {
        this.instructorsCourseList = instructors;
      });
  }

  getSafeHTMLContent(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.courseVideo.link);
  }
}
