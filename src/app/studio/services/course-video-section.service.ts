import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { enviroment } from 'src/environments/environments';
import { CourseVideoSection } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CourseVideoSectionService {
  private readonly baseUrl: string = enviroment.baseUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    if (!token) {
      this.authService.logout();
      throw new Error('Token not found');
    }

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  findAll() {
    const url = `${this.baseUrl}/section-course-video`;
    return this.http.get<CourseVideoSection[]>(url);
  }

  findById(id: string) {
    const url = `${this.baseUrl}/section-course-video/${id}`;
    return this.http.get<CourseVideoSection>(url);
  }

  findBySectionId(sectionId: string) {
    const url = `${this.baseUrl}/section-course-video/by-course-id/${sectionId}`;
    return this.http.get<CourseVideoSection[]>(url);
  }

  create(newCourse: CourseVideoSection) {
    const url = `${this.baseUrl}/section-course-video`;
    const headers = this.getHeaders();
    return this.http.post<CourseVideoSection>(url, newCourse, { headers });
  }

  updateById(id: string, updateSectionCourse: CourseVideoSection) {
    const url = `${this.baseUrl}/section-course-video/${id}`;
    const headers = this.getHeaders();
    return this.http.patch<CourseVideoSection>(url, updateSectionCourse, { headers });
  }

  removeById(id: string) {
    const url = `${this.baseUrl}/section-course-video/${id}`;
    const headers = this.getHeaders();
    return this.http.delete(url, { headers });
  }

}
