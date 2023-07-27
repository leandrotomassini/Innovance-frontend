import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class VideoPreviewService {
  private videoClickedSubject = new Subject<string>(); 

  videoClicked$ = this.videoClickedSubject.asObservable();

  videoPreviewClicked(idVideo: string = '') {
    this.videoClickedSubject.next(idVideo);
  }
}
