import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Data } from '../interfaces';


@Injectable()
export class VideoPreviewService {

  private videoClickedSubject = new Subject<Data>();
  private videoEditCompletedSubject = new Subject<void>(); // Agregar un Subject para indicar que la edición se ha completado

  videoClicked$ = this.videoClickedSubject.asObservable();
  videoEditCompleted$ = this.videoEditCompletedSubject.asObservable(); // Exponer el Observable para que otros componentes lo puedan escuchar

  videoPreviewClicked(idVideo: string = '', idSection = '') {
    const data: Data = { idVideo, idSection };
    this.videoClickedSubject.next(data);
  }

  videoEditCompleted() {
    this.videoEditCompletedSubject.next();
  }
}
