import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { CommentVideo } from 'src/app/interfaces/comment.interface';
import { enviroment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CommentsVideoService {
  private readonly baseUrl: string = enviroment.baseUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    if (!token) {
      this.authService.logout();
      throw new Error('Token not found');
    }

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  findAll() {
    const url = `${this.baseUrl}/video-comment`;
    return this.http.get<CommentVideo[]>(url);
  }

  findByVideoId(idVideo: string) {
    const url = `${this.baseUrl}/video-comment/video/${idVideo}`;
    return this.http.get<CommentVideo[]>(url);
  }

  create(videoCourse: string, commentVideo: string) {

    const url = `${this.baseUrl}/video-comment`;

    const headers = this.getHeaders();

    const body = {
      videoCourse,
      comment: commentVideo,
    };

    return this.http.post<CommentVideo>(url, body, { headers });
  }

  updateById(videoCourse: string, commentVideo: string, idComment: string) {
   
    const url = `${this.baseUrl}/video-comment/${idComment}`;

    const headers = this.getHeaders();

    const body = {
      videoCourse,
      comment: commentVideo,
    };

    return this.http.patch<CommentVideo>(url, body, { headers });
  }

  removeById(idComment: string) {
    const url = `${this.baseUrl}/video-comment/${idComment}`;
    const headers = this.getHeaders();
    return this.http.delete(url, { headers });
  }

}
