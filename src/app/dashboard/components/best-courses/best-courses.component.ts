import { Component, OnInit } from '@angular/core';

import { Course } from 'src/app/studio/interfaces';
import { CoursesService } from 'src/app/studio/services';

@Component({
  selector: 'app-best-courses',
  templateUrl: './best-courses.component.html',
  styleUrls: ['./best-courses.component.css']
})
export class BestCoursesComponent implements OnInit {

  courses: Course[] = [];

  constructor(private courseService: CoursesService) { }

  ngOnInit(): void {
    this.courseService.findAll()
      .subscribe((courses) => {
        this.courses = courses;
      });
  }

}
