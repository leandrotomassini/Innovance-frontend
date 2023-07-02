import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { catchError, map, Observable, of, throwError, pipe, switchMap } from 'rxjs';
import { Router } from '@angular/router';

import { enviroment } from 'src/environments/environments.example';
import { CheckTokenResponse, LoginResponse, User } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = enviroment.baseUrl;
  private http = inject(HttpClient);
  private router = inject(Router);

  currentUser: User = {
    email: '',
    fullName: '',
    id: '',
    isActive: false,
    roles: ['']
  };

  authStatus: boolean = false;

  private setAuthentication(user: User, token: string): Observable<boolean> {
    this.currentUser = user;
    localStorage.setItem('token', token);
    this.authStatus = true;
    return of(true);
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      switchMap(({ user, token }) => {
        return this.setAuthentication(user, token);
      }),
      catchError(err => {
        return throwError(() => err.error.message);
      })
    );
  }

  checkAuthStatus(): Observable<boolean> {

    const url = `${this.baseUrl}/auth/check-status`;

    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        switchMap(({ user, token }) => {
          this.setAuthentication(user, token);
          return of(true);
        })
      );
  }

  logout() {

    localStorage.removeItem('token');
    localStorage.clear();

    this.currentUser = {
      email: '',
      fullName: '',
      id: '',
      isActive: false,
      roles: ['']
    };

    this.authStatus = false;
    this.router.navigateByUrl('/');
  }



}
