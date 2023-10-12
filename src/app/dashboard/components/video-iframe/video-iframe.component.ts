import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video-iframe',
  templateUrl: './video-iframe.component.html',
  styleUrls: ['./video-iframe.component.css'],
})
export class VideoIframeComponent  {
  @Input() link:any = undefined;

}
