import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, firstValueFrom } from 'rxjs';
import { AsyncPipe } from '@angular/common';

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
  CoursesService,
} from 'src/app/studio/services';

@Component({
  selector: 'app-view-course-video',
  templateUrl: './view-course-video.component.html',
  styleUrls: ['./view-course-video.component.css'],
})
export class ViewCourseVideoComponent implements OnInit {
  id: string = 'cb6b4cd5-24c9-48f6-82e6-b0b306a55dbb';
  link: SafeResourceUrl = '';
  cursoSlug: string = '';
  slugVideo: string = '';
  videosList: CourseVideo[] = [];
  instructorsCourseList: CourseInstructor[] = [];

  course: Course = {
    description: '',
    frontPage: '',
    logo: '',
    slug: '',
    title: '',
    idCourse: '',
  };

  sectionsCourse: CourseSection[] = [];

  courseVideo: CourseVideo = {
    description: '',
    link: '',
    number: 0,
    previewAnimation: '',
    thumbnailUrl: '',
    title: '',
    url: '',
  };

  @ViewChild('myEditor') myEditor: any;
  editorContent = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
    private sectionService: CourseSectionService,
    private videoSectionService: CourseVideoSectionService,
    private instructorsCourse: CourseInstructorService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.cursoSlug = params['slugCurso'];
      this.slugVideo = params['slugVideo'];

      this.coursesService.findBySlug(this.cursoSlug).subscribe((course) => {
        this.course = course;
        this.getInstructorsCourse();
        this.sectionService
          .findByCourseId(course.idCourse!)
          .subscribe((sections) => {
            this.sectionsCourse = this.sortVideosByNumber(sections); // Ordenar las secciones y videos
            this.findFirstVideoBySlug(this.slugVideo);
          });
      });
    });
  }

  isMenuOpen = false;

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
      });
    });
  }

  loadVideosForSections() {
    for (const section of this.sectionsCourse) {
      this.videoSectionService
        .findBySectionId(section.sectionCourseId!)
        .subscribe((videos) => {
          section.videos = videos.map((video) => video.videoCourse).sort((a, b) => a.number - b.number);
        });
    }
  }

  findVideoBySlug(slug: string) {
    let routeCourse: string = '/clases/' + this.course.slug + '/' + slug;
    this.router.navigateByUrl(routeCourse);

    for (const section of this.sectionsCourse) {
      if (section.videos) {
        const foundVideo = section.videos.find((video) => video.url === slug);

        if (foundVideo) {
          this.courseVideo = foundVideo;
          this.link = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://iframe.mediadelivery.net/embed/159263/${this.courseVideo.link}?autoplay=true&loop=false&muted=false&preload=true`
          );
          break;
        }
      }
    }
  }

  async findFirstVideoBySlug(slug: string) {
    for (const section of this.sectionsCourse) {
      try {
        const videos = await firstValueFrom(
          this.videoSectionService.findBySectionId(section.sectionCourseId!)
        );

        if (videos && videos.length > 0) {
          section.videos = videos.map((video) => video.videoCourse);

          const foundVideo = section.videos.find((video) => video.url === slug);

          if (foundVideo) {
            this.courseVideo = foundVideo;
            this.link = this.sanitizer.bypassSecurityTrustResourceUrl(
              `https://iframe.mediadelivery.net/embed/163809/${this.courseVideo.link}?autoplay=true&loop=false&muted=false&preload=true`
            );
            break;
          }
        }
      } catch (error) { }
    }
  }

  getInstructorsCourse() {
    this.instructorsCourse
      .findByCourseId(this.course.idCourse!)
      .subscribe((instructors) => {
        this.instructorsCourseList = instructors;
      });
  }

  guardarContenido() {
    // Obtener el contenido del editor
    const content = this.myEditor.editor.getContent();

    // Mostrar el contenido en la consola
    console.log(content);

    // También puedes asignar el contenido a una variable si lo necesitas en otro lugar
    this.editorContent = content;
  }

  sortVideosByNumber(sections: CourseSection[]): CourseSection[] {
    sections.forEach((section) => {
      if (section.videos && section.videos.length > 0) {
        section.videos.sort((a, b) => a.number - b.number);
      }
    });
    return sections;
  }
}
