import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000'; // Replace with your actual API base URL
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginData = {
      username: username,
      password: password,
    };

    const loginUrl = `${this.baseUrl}/user/login`;

    return this.http.post(loginUrl, loginData).pipe(
      catchError((error) => {
        throw error; // Handle error as per your application's needs
      })
    );
  }

  registerUser(userData: any): Observable<any> {
    const url = `${this.baseUrl}/user/register`; // Replace with your registration API endpoint
    return this.http.post(url, userData);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  setAuthenticationState(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  getUserProfile(): Observable<any> {
    const url = `${this.baseUrl}/user/profile`; // Replace with the actual endpoint to retrieve user profile
    return this.http.get<any>(url);
  }
}
