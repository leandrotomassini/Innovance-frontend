import { Component, Input, OnInit } from '@angular/core';

import { CourseVideoSectionService } from '../../services';
import { CourseVideo, CourseVideoSection } from '../../interfaces';

@Component({
  selector: 'app-course-video-list',
  templateUrl: './course-video-list.component.html',
  styleUrls: ['./course-video-list.component.css']
})
export class CourseVideoListComponent implements OnInit {

  @Input() sectionId: string = '';
  videosSection: CourseVideo[] = [];

  constructor(private courseVideoSectionService: CourseVideoSectionService) { }

  ngOnInit(): void {
    this.fetchVideosBySectionId();
  }

  fetchVideosBySectionId(): void {
    this.courseVideoSectionService.findBySectionId(this.sectionId)
      .subscribe((videos: CourseVideoSection[]) => {
        this.videosSection = videos.map(v => v.videoCourse)
          .sort((a, b) => a.number.localeCompare(b.number));
      });
  }

  removeVideo() {
    console.log('borrar video')
  }

  addVideo() {
    console.log('nuevo video')
  }
}
