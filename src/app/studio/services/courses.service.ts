import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from 'src/app/auth/services/auth.service';
import { enviroment } from 'src/environments/environments';
import { Course } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class CoursesService {

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
    const url = `${this.baseUrl}/course`;
    return this.http.get<Course[]>(url);
  }

  findById(id: string) {
    const url = `${this.baseUrl}/course/${id}`;
    return this.http.get<Course>(url);
  }

  create(newCourse: Course) {
    const url = `${this.baseUrl}/course`;
    const headers = this.getHeaders();
    return this.http.post<Course>(url, newCourse, { headers });
  }

  updateById(id: string, updateCourse: Course) {
    const url = `${this.baseUrl}/course/${id}`;
    const headers = this.getHeaders();
    return this.http.patch<Course>(url, updateCourse, { headers });
  }

  removeById(id: string) {
    const url = `${this.baseUrl}/course/${id}`;
    const headers = this.getHeaders();
    return this.http.delete(url, { headers });
  }

}
