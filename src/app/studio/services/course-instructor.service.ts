import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { enviroment } from 'src/environments/environments';
import { CourseInstructor } from '../interfaces/course-instructor.interface';



@Injectable({
  providedIn: 'root'
})
export class CourseInstructorService {

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
    const url = `${this.baseUrl}/course-instructor`;
    return this.http.get<CourseInstructor[]>(url);
  }

  findByCourseId(idCourse: string) {
    const url = `${this.baseUrl}/course-instructor/${idCourse}`;
    return this.http.get<CourseInstructor[]>(url);
  }

  findBySlug(slug: string) {
    const url = `${this.baseUrl}/course-instructor/slug/${slug}`;
    return this.http.get<CourseInstructor>(url);
  }

  create(idCourse: string, idInstructor: string) {
    const url = `${this.baseUrl}/course-instructor`;
    const headers = this.getHeaders();

    const body = {
      course: idCourse,
      instructor: idInstructor
    };

    return this.http.post<CourseInstructor>(url, body, { headers });
  }

  updateById(idCourseInstructor: string, updateCourse: CourseInstructor) {
    const url = `${this.baseUrl}/course-instructor/${idCourseInstructor}`;
    const headers = this.getHeaders();
    return this.http.patch<CourseInstructor>(url, updateCourse, { headers });
  }

  removeById(idCourseInstructor: string) {
    const url = `${this.baseUrl}/course-instructor/${idCourseInstructor}`;
    const headers = this.getHeaders();
    return this.http.delete(url, { headers });
  }

}
