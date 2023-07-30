import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { VideoPreviewService, CourseVideoService } from '../../services';
import { CourseVideo, Data } from '../../interfaces';
import { VideoFormComponent } from '../video-form/video-form.component';

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.css']
})
export class VideoPreviewComponent implements OnDestroy {
  private subscription: Subscription;
  videoId: string = '';
  sectionId: string = '';

  video: CourseVideo = {
    number: '0',
    title: '',
    url: '',
    link: '',
    description: '',
    status: false
  };

  constructor(
    private videoPreviewService: VideoPreviewService,
    private courseVideoService: CourseVideoService,
    private dialog: MatDialog
  ) {
    this.subscription = this.videoPreviewService.videoClicked$
      .subscribe((data: Data) => {
        const { idVideo, idSection } = data;
        this.videoId = idVideo;
        this.sectionId = idSection;
        this.courseVideoService.findById(idVideo)
          .subscribe(video => this.video = video);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  editVideo(idVideo: string = '') {
    console.log('edit video ' + idVideo + ' section id: ' + this.sectionId);

    const dialogRef = this.dialog.open(VideoFormComponent, {
      data: {
        isNewVideo: idVideo === '',
        idSection: this.sectionId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed:', result);
    });
  }
}
