import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-iframe',
  templateUrl: './video-iframe.component.html',
  styleUrls: ['./video-iframe.component.css'],
})
export class VideoIframeComponent implements OnInit {
  @Input() saludo:any = undefined;

  ngOnInit(): void {
    console.log('Link: ' + this.saludo);
  }
}
