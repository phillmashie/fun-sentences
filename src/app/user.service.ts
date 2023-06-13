import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000'; // Replace with your actual API base URL

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginData = {
      username: username,
      password: password,
    };

    const loginUrl = `${this.baseUrl}/api/login`;

    return this.http.post(loginUrl, loginData).pipe(
      catchError((error) => {
        throw error; // Handle error as per your application's needs
      })
    );
  }

  registerUser(userData: any): Observable<any> {
    const url = `${this.baseUrl}/register`; // Replace with your registration API endpoint
    return this.http.post(url, userData);
  }
}
