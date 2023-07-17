import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-video-list',
  templateUrl: './course-video-list.component.html',
  styleUrls: ['./course-video-list.component.css']
})
export class CourseVideoListComponent {

  @Input() sectionId: string = '';

  

}
