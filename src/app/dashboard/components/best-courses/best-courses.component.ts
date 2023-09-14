import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseSectionService, CourseVideoSectionService, CourseVideoService, CoursesService } from 'src/app/studio/services';
import { Course, CourseSection, CourseVideoSection } from 'src/app/studio/interfaces';

@Component({
  selector: 'app-best-courses',
  templateUrl: './best-courses.component.html',
  styleUrls: ['./best-courses.component.css']
})
export class BestCoursesComponent implements OnInit {

  courses: Course[] = [];

  constructor(
    private courseService: CoursesService,
    private sectionService: CourseSectionService,
    private videoService: CourseVideoService,
    private courseVideoSectionService: CourseVideoSectionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseService.findAll()
      .subscribe(courses => this.courses = courses);
  }

  viewCourse(slug: string, video: string) {
    let sectionsCourse: CourseSection[] = [];
    let videosSection: CourseVideoSection[] = [];
    let course: Course = {
      description: '',
      frontPage: '',
      logo: '',
      slug: '',
      title: '',
      idCourse: ''
    };

    this.courseService.findBySlug(slug)
      .subscribe(courseResponse => {
        course = courseResponse;
        this.sectionService.findByCourseId(course.idCourse!)
          .subscribe(sections => {
            sectionsCourse = sections;
            for (let section of sections) {
              this.courseVideoSectionService.findBySectionId(section.sectionCourseId!)
                .subscribe((videosCourseSection) => {
                  this.router.navigate([`/clases/${courseResponse.slug}/${videosCourseSection[0]?.videoCourse.url}`]);
                });
              break;
            }
          });
      });
  }
}
