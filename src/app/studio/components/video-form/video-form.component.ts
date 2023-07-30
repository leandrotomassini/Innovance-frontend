import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observer } from 'rxjs';

import { CourseVideo, CourseVideoSectionCreate } from '../../interfaces';
import { CourseVideoService, CourseVideoSectionService } from '../../services';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.css']
})
export class VideoFormComponent implements OnInit {
  videoForm!: FormGroup;
  videoCourse: CourseVideo = {
    number: '',
    title: '',
    link: '',
    description: '',
    url: ''
  };
  newVideoId: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      isNewVideo: boolean,
      idSection: string,
      idVideo?: string // Make the idVideo optional here
    },
    private fb: FormBuilder,
    private videoCourseService: CourseVideoService,
    private videoCourseSectionService: CourseVideoSectionService,
    private dialogRef: MatDialogRef<VideoFormComponent>
  ) { }

  ngOnInit() {
    this.videoForm = this.fb.group({
      number: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      url: ['', [Validators.required]],
      title: ['', [Validators.required]],
      link: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    if (!this.data.isNewVideo && this.data.idVideo) {
      this.videoCourseService.findById(this.data.idVideo)
        .subscribe((video) => {
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
      description: this.videoCourse.description
    });
  }

  saveVideo() {
    if (this.videoForm.valid) {
      const videoData = {
        ...this.videoCourse,
        idVideo: undefined, // Eliminar la propiedad idVideo
        status: undefined, // Eliminar la propiedad status
      };

      videoData.number = this.videoForm.value.number;
      videoData.title = this.videoForm.value.title;
      videoData.url = this.videoForm.value.url;
      videoData.description = this.videoForm.value.description;
      videoData.link = `https://iframe.mediadelivery.net/embed/138804/7d5776e1-8fff-4e8a-8831-48a237fa823e?autoplay=true`;

      const observer: Observer<CourseVideo> = {
        next: (updatedVideo: CourseVideo) => {
          this.newVideoId = updatedVideo.idVideo!;
        },
        error: (error: any) => {
          console.error('Error updating video:', error);
        },
        complete: () => { }
      };

      if (this.data.isNewVideo) {
        this.videoCourseService.create(videoData).subscribe((video) => {
          const courseVideoSectionCreate: CourseVideoSectionCreate = {
            sectionCourse: this.data.idSection,
            videoCourse: video.idVideo!
          };

          this.videoCourseSectionService.create(courseVideoSectionCreate).subscribe(() => {
            this.dialogRef.close();
          });
        });
      } else {
        this.videoCourseService.updateById(this.data.idVideo!, videoData)
          .subscribe(() => {
            this.dialogRef.close();
          });
      }
    }
  }
}
