import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { VideoPreviewService, CourseVideoService } from '../../services';
import { CourseVideo, Data } from '../../interfaces';
import { VideoFormComponent } from '../video-form/video-form.component';

@Component({
  selector: 'app-video-preview',
  templateUrl: './video-preview.component.html',
  styleUrls: ['./video-preview.component.css'],
})
export class VideoPreviewComponent implements OnDestroy {
  @Output() videoUpdated = new EventEmitter<void>();
  @Output() mensajeClicked = new EventEmitter<void>();

  private subscription: Subscription;
  videoId: string = '';
  sectionId: string = '';

  video: CourseVideo = {
    number: '0',
    title: '',
    url: '',
    link: '',
    description: '',
    thumbnailUrl: '',
    previewAnimation: '',
    status: false,
  };

  constructor(
    private videoPreviewService: VideoPreviewService,
    private courseVideoService: CourseVideoService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {
    this.subscription = this.videoPreviewService.videoClicked$.subscribe(
      (data: Data) => {
        const { idVideo, idSection } = data;
        this.videoId = idVideo;
        this.sectionId = idSection;
        this.courseVideoService
          .findById(idVideo)
          .subscribe((video) => (this.video = video));
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  editVideo(idVideo: string = '') {
    const dialogRef = this.dialog.open(VideoFormComponent, {
      data: {
        isNewVideo: idVideo === '',
        idSection: this.sectionId,
        idVideo: idVideo,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.courseVideoService.findById(idVideo).subscribe((video) => {
        this.video = video;
        this.videoUpdated.emit();
      });
    });
  }

  addFile() {}

  getSafeHTMLContent(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.video.link);
  }
}
