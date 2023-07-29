import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

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
    private videoPreviewService: VideoPreviewService,
  ) { }

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

  removeVideo(idVideo: string, number: string, title: string) {
    Swal.fire({
      title: `¿Está seguro de borrar el video ${number} - ${title}?`,
      text: 'Esta acción es irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseVideoSectionService
          .findBySectionId(this.sectionId)
          .subscribe((videos: CourseVideoSection[]) => {
            const videoInSection = videos.find((v) => v.videoCourse.idVideo === idVideo);
            if (videoInSection) {
              this.courseVideoSectionService.removeById(videoInSection.idSectionCourseVideo!)
                .subscribe(() => {
                  this.fetchVideosBySectionId();
                  this.snackBar.open(`Video ${number} - ${title} removido de la sección correctamente.`, 'OK', {
                    duration: 3000
                  });
                });
            }
          });
      }
    });
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
