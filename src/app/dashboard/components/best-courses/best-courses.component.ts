import { Component, OnInit } from '@angular/core';

import { CoursesService } from 'src/app/studio/services';
import { Course } from 'src/app/studio/interfaces';

@Component({
  selector: 'app-best-courses',
  templateUrl: './best-courses.component.html',
  styleUrls: ['./best-courses.component.css']
})
export class BestCoursesComponent implements OnInit {

  courses: Course[] = [];

  constructor(
    private courseService: CoursesService,
    
  ) { }

  ngOnInit(): void {
    this.courseService.findAll()
      .subscribe(courses => this.courses = courses);

  }

  viewCourse(slug: string, video: string) {
    console.log('ver curso: /' + slug + '/' + video)
  }


}
