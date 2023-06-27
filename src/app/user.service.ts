import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Base Url
  private baseUrl = 'http://localhost:3000';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  // Login logic
  login(username: string, password: string): Observable<any> {
    const loginData = {
      username: username,
      password: password,
    };

    const loginUrl = `${this.baseUrl}/user/login`;

    return this.http.post(loginUrl, loginData).pipe(
      catchError((error) => {
        throw error;
      })
    );
  }

  // Registration logic
  registerUser(userData: any): Observable<any> {
    const url = `${this.baseUrl}/user/register`;
    return this.http.post(url, userData);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  setAuthenticationState(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  // User Profile
  getUserProfile(): Observable<any> {
    const url = `${this.baseUrl}/user/profile`;
    return this.http.get<any>(url);
  }
}
