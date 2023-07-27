import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { VideoPreviewService, CourseVideoService } from '../../services';
import { CourseVideo } from '../../interfaces';

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.css']
})
export class VideoPreviewComponent implements OnDestroy {
  private subscription: Subscription;
  videoId: string = '';
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
    private courseVideoService: CourseVideoService
  ) {
    this.subscription = this.videoPreviewService.videoClicked$
      .subscribe((videoId: string) => {
        console.log('Video clicked in CourseVideoListComponent');
        this.videoId = videoId;
        this.courseVideoService.findById(videoId)
          .subscribe(video => this.video = video);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
