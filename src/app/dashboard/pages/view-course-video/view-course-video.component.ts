import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-view-course-video',
  templateUrl: './view-course-video.component.html',
  styleUrls: ['./view-course-video.component.css'],
})
export class ViewCourseVideoComponent implements OnInit {
  id: string = 'cb6b4cd5-24c9-48f6-82e6-b0b306a55dbb';
  link: SafeResourceUrl = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.link = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://iframe.mediadelivery.net/embed/159263/${this.id}?autoplay=true&loop=false&muted=false&preload=true`
    );
  }

  saludar() {
    console.log('Hola: ' + this.link);
  }
}
