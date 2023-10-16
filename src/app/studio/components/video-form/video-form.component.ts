import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observer } from 'rxjs';
import { enviroment } from 'src/environments/environments';

import { CourseVideo, CourseVideoSectionCreate } from '../../interfaces';
import { CourseVideoService, CourseVideoSectionService } from '../../services';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.css'],
})
export class VideoFormComponent implements OnInit {
  @ViewChild('myEditor') myEditor: any;
  videoForm!: FormGroup;
  apiKey: string = enviroment.tinyApi;

  videoCourse: CourseVideo = {
    number: 0,
    title: '',
    link: '',
    description: '',
    url: '',
    thumbnailUrl: '',
    previewAnimation: '',
  };
  newVideoId: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      isNewVideo: boolean;
      idSection: string;
      idVideo?: string;
    },
    private fb: FormBuilder,
    private videoCourseService: CourseVideoService,
    private videoCourseSectionService: CourseVideoSectionService,
    private dialogRef: MatDialogRef<VideoFormComponent>
  ) {}

  ngOnInit() {
    this.videoForm = this.fb.group({
      number: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      url: ['', [Validators.required]],
      title: ['', [Validators.required]],
      link: ['', [Validators.required]],
      thumbnailUrl: ['', [Validators.required]],
      previewAnimation: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    if (!this.data.isNewVideo && this.data.idVideo) {
      this.videoCourseService.findById(this.data.idVideo).subscribe((video) => {
        this.videoCourse = video;
        this.populateFormWithVideoData();
      });
    }
  }

  populateFormWithVideoData() {
    this.videoForm.patchValue({
      number: this.videoCourse.number,
      title: this.videoCourse.title,
      url: this.videoCourse.url,
      link: this.videoCourse.link,
      description: this.videoCourse.description,
      thumbnailUrl: this.videoCourse.thumbnailUrl,
      previewAnimation: this.videoCourse.previewAnimation,
    });
  }

  saveVideo() {
    if (this.videoForm.valid) {
      const videoData = {
        ...this.videoCourse,
        idVideo: undefined,
        status: undefined,
      };

      videoData.number = this.videoForm.value.number;
      videoData.title = this.videoForm.value.title;
      videoData.url = this.videoForm.value.url;
      videoData.description = this.videoForm.value.description;
      videoData.link = this.videoForm.value.link;
      videoData.thumbnailUrl = this.videoForm.value.thumbnailUrl;
      videoData.previewAnimation = this.videoForm.value.previewAnimation;

      const observer: Observer<CourseVideo> = {
        next: (updatedVideo: CourseVideo) => {
          this.newVideoId = updatedVideo.idVideo!;
        },
        error: (error: any) => {
          console.error('Error updating video:', error);
        },
        complete: () => {},
      };

      if (this.data.isNewVideo) {
        this.videoCourseService.create(videoData).subscribe((video) => {
          const courseVideoSectionCreate: CourseVideoSectionCreate = {
            sectionCourse: this.data.idSection,
            videoCourse: video.idVideo!,
          };

          this.videoCourseSectionService
            .create(courseVideoSectionCreate)
            .subscribe(() => {
              this.dialogRef.close();
            });
        });
      } else {
        this.videoCourseService
          .updateById(this.data.idVideo!, videoData)
          .subscribe(() => {
            this.dialogRef.close();
          });
      }
    }
  }
}
