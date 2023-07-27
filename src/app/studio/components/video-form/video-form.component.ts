import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observer } from 'rxjs';

import { CourseVideo, CourseVideoSection, CourseVideoSectionCreate } from '../../interfaces';
import { CourseVideoSectionService, CourseVideoService } from '../../services';

@Component({
  selector: 'app-video-form',
  templateUrl: './video-form.component.html',
  styleUrls: ['./video-form.component.css']
})
export class VideoFormComponent {

  videoForm: FormGroup;

  videoCourse: CourseVideo = {
    number: '',
    title: '',
    link: '',
    description: '',
    url: ''
  };

  newVideoId: string = '';

  courseVideoSectionCreate: CourseVideoSectionCreate = {
    sectionCourse: this.data.idSection,
    videoCourse: ''
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      isNewVideo: boolean,
      idSection: string
    },
    private fb: FormBuilder,
    private videoCourseService: CourseVideoService,
    private videoCourseSectionService: CourseVideoSectionService,
    private dialogRef: MatDialogRef<VideoFormComponent>
  ) {

    this.videoForm = this.fb.group({
      number: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      url: ['introduccion', [Validators.required]],
      title: ['Bienvenida', [Validators.required]],
      link: ['7d5776e1-8fff-4e8a-8831-48a237fa823e', [Validators.required]],
      description: ['👀 ¿Terminaste el colegio y aún no sabes qué carrera o profesión deberías estudiar? 💥 Desde que la tecnología llegó a nuestras vidas han nacido un montón de profesiones y carreras relacionadas con la industria. Puede ser confuso entender cuál de todas estudiar, es por eso que en este video Angela Ocando y Cesar Cordero te contarán un poquito de cómo han nacido estas profesiones y cómo deberías elegir tu profesión del futuro. 🌟 Este es el séptimo video de nuestra serie: "Ya terminé el colegio, ¿y ahora qué?", donde te estaremos dando una guía para entender cómo manejar tu dinero. (Míralo como un manual de supervivencia para la adultez 👾). 🤝 Esta es una serie creada en colaboración con @YouTube y @UNESCO en español', [Validators.required]],
    });

  }

  saveVideo() {
    if (this.videoForm.valid) {
      this.videoCourse.number = this.videoForm.value.number;
      this.videoCourse.title = this.videoForm.value.title;
      this.videoCourse.url = this.videoForm.value.url;
      this.videoCourse.description = this.videoForm.value.description;
      this.videoCourse.link = `https://iframe.mediadelivery.net/embed/138804/7d5776e1-8fff-4e8a-8831-48a237fa823e?autoplay=true`;

      const observer: Observer<CourseVideo> = {
        next: (newVideo: CourseVideo) => {
          this.newVideoId = newVideo.idVideo!;
        },
        error: (error: any) => {
          console.error('Error creating video:', error);
        },
        complete: () => { }
      };

      this.videoCourseService.create(this.videoCourse)
        .subscribe(video => {

          this.courseVideoSectionCreate = {
            sectionCourse: this.data.idSection,
            videoCourse: video.idVideo!
          }

          this.videoCourseSectionService.create(this.courseVideoSectionCreate)
            .subscribe(() => {
              this.dialogRef.close();
            })
        });
    }
  }
}



