import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Data } from '../interfaces';


@Injectable()
export class VideoPreviewService {

  private videoClickedSubject = new Subject<Data>();

  videoClicked$ = this.videoClickedSubject.asObservable();

  videoPreviewClicked(idVideo: string = '', idSection = '') {
    const data: Data = { idVideo, idSection };
    this.videoClickedSubject.next(data);
  }
}
