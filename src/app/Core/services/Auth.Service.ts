import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../shared/models/user.models';
import { Router } from '@angular/router';
import { StudentRequest } from '../../shared/models/student-request.model';
import { LoginRequest } from '../../shared/models/login-request.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private _user = signal<User | null>(null);

  user = this._user.asReadonly();

  private apiUrl = 'https://localhost:7180/api/v1';

  register(data: StudentRequest) {
    return this.http.post(`${this.apiUrl}/Student/Register`, data);
  }

  login(data: LoginRequest) {
    return this.http.post<any>(`${this.apiUrl}/Auth/Login`, data);
  }

  saveSession(response: any) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data));
    this._user.set(response.data);
  }

  logout() {
    localStorage.clear();
    this._user.set(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  constructor() {
    const savedUser = localStorage.getItem('user');
    try {
      if (savedUser && savedUser !== 'undefined') {
        this._user.set(JSON.parse(savedUser));
      }
    } catch (error) {
      localStorage.removeItem('user');
    }
  }
}
