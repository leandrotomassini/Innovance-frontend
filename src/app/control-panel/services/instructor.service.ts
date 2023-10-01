import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from 'src/app/auth/services/auth.service';
import { enviroment } from 'src/environments/environments';
import { Instructor } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

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
    const url = `${this.baseUrl}/instructor`;
    return this.http.get<Instructor[]>(url);
  }

  findById(id: string) {
    const url = `${this.baseUrl}/instructor/${id}`;
    return this.http.get<Instructor>(url);
  }

  create(newInstructor: Instructor) {
    const url = `${this.baseUrl}/instructor`;
    const headers = this.getHeaders();
    return this.http.post<Instructor>(url, newInstructor, { headers });
  }

  updateById(id: string, updateInstructor: Instructor) {
    const url = `${this.baseUrl}/instructor/${id}`;
    const headers = this.getHeaders();
    return this.http.patch<Instructor>(url, updateInstructor, { headers });
  }

  removeById(id: string) {
    const url = `${this.baseUrl}/instructor/${id}`;
    const headers = this.getHeaders();
    return this.http.delete(url, { headers });
  }
}
