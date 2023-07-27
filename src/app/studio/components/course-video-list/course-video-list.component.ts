import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CourseVideoSectionService } from '../../services';
import { CourseVideo, CourseVideoSection } from '../../interfaces';
import { VideoFormComponent } from '../video-form/video-form.component';
import { VideoPreviewService } from '../../services';

@Component({
  selector: 'app-course-video-list',
  templateUrl: './course-video-list.component.html',
  styleUrls: ['./course-video-list.component.css'],
})
export class CourseVideoListComponent implements OnInit {
  @Input() sectionId: string = '';
  videosSection: CourseVideo[] = [];

  constructor(
    private courseVideoSectionService: CourseVideoSectionService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private videoPreviewService: VideoPreviewService
  ) {}

  ngOnInit(): void {
    this.fetchVideosBySectionId();
  }

  fetchVideosBySectionId(): void {
    this.courseVideoSectionService
      .findBySectionId(this.sectionId)
      .subscribe((videos: CourseVideoSection[]) => {
        this.videosSection = videos
          .map((v) => v.videoCourse)
          .sort((a, b) => a.number.localeCompare(b.number));
      });
  }

  removeVideo() {
    console.log('borrar video');
  }

  addVideo() {
    const dialogRef = this.dialog.open(VideoFormComponent, {
      data: {
        isNewVideo: true,
        idSection: this.sectionId
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchVideosBySectionId();
      this.snackBar.open('Video creado correctamente', 'OK', {
        duration: 3000
      });
    });
  }

  onVideoClick(videoId: string) {
    this.videoPreviewService.videoPreviewClicked(videoId); 
  }
}
