import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { enviroment } from '../../../environments/environments';
import { CheckTokenResponse, LoginResponse, User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl: string = enviroment.baseUrl;

  currentUser: User = {
    email: '',
    fullName: '',
    id: '',
    isActive: false,
    roles: ['']
  };

  authStatus: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  private setAuthentication(user: User, token: string): void {
    this.currentUser = user;
    localStorage.setItem('token', token);
    this.authStatus = true;
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body).pipe(
      switchMap(({ user, token }) => {
        this.setAuthentication(user, token);
        return of(true);
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

    return this.http.get<CheckTokenResponse>(url, { headers }).pipe(
      switchMap(({ user, token }) => {
        this.setAuthentication(user, token);
        return of(true);
      })
    );
  }

  logout(): void {
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

  usersList(): Observable<User[]> {
    const url = `${this.baseUrl}/auth/users`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of([]);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User[]>(url, { headers });
  }

  findOneById(id: string): Observable<User> {
    const url = `${this.baseUrl}/auth/${id}`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return throwError(() => new Error('Token not found'));
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(url, { headers });
  }

}
