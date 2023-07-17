import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { enviroment } from 'src/environments/environments';
import { CourseSection } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CourseSectionService {

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
    const url = `${this.baseUrl}/section-course`;
    return this.http.get<CourseSection[]>(url);
  }

  findById(id: string) {
    const url = `${this.baseUrl}/section-course/${id}`;
    return this.http.get<CourseSection>(url);
  }

  findByCourseId(courseId: string) {
    const url = `${this.baseUrl}/section-course/by-course-id/${courseId}`;
    return this.http.get<CourseSection[]>(url);
  }

  create(newCourse: CourseSection) {
    const url = `${this.baseUrl}/section-course`;
    const headers = this.getHeaders();
    return this.http.post<CourseSection>(url, newCourse, { headers });
  }

  updateById(id: string, updateSectionCourse: CourseSection) {
    const url = `${this.baseUrl}/section-course/${id}`;
    const headers = this.getHeaders();
    return this.http.patch<CourseSection>(url, updateSectionCourse, { headers });
  }

  removeById(id: string) {
    const url = `${this.baseUrl}/section-course/${id}`;
    const headers = this.getHeaders();
    return this.http.delete(url, { headers });
  }

}
