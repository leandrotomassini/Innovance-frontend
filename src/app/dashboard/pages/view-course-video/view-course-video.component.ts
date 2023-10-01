import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class ViewCourseVideoComponent implements OnInit, AfterViewInit {
  isMenuOpen = false;
  cursoSlug: string = '';
  slugVideo: string = '';
  videosList: CourseVideo[] = [];
  instructorsCourseList: CourseInstructor[] = [];
  tagFlag: boolean = false;

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
    private router: Router,
    private coursesService: CoursesService,
    private sectionService: CourseSectionService,
    private videoSectionService: CourseVideoSectionService,
    private instructorsCourse: CourseInstructorService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.cursoSlug = params['slugCurso'];
      this.slugVideo = params['slugVideo'];

      this.coursesService.findBySlug(this.cursoSlug).subscribe((course) => {
        this.course = course;
        this.getInstructorsCourse();
        this.sectionService
          .findByCourseId(course.idCourse!)
          .subscribe((sections) => {
            this.sectionsCourse = sections;
            this.loadVideosForSections();
          });
      });
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.findFirstVideoBySlug(this.slugVideo);
    }, 1000);
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

  changeTab() {
    this.tagFlag = !this.tagFlag;
  }

  findVideoBySlug(slug: string) {
    let routeCourse: string = '/clases/' + this.course.slug + '/' + slug;
    this.router.navigateByUrl(routeCourse);

    for (const section of this.sectionsCourse) {
      if (section.videos) {
        const foundVideo = section.videos.find((video) => video.url === slug);

        if (foundVideo) {
          this.courseVideo = foundVideo;
          break;
        }
      }
    }
  }

  findFirstVideoBySlug(slug: string) {
    const checkVideos = () => {
      for (const section of this.sectionsCourse) {
        if (section.videos) {
          const foundVideo = section.videos.find((video) => video.url === slug);

          if (foundVideo) {
            this.courseVideo = foundVideo;
            break;
          }
        }
      }

      if (!this.courseVideo) {
        setTimeout(checkVideos, 1000);
      }
    };

    checkVideos();
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
