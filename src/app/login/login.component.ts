import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    this.userService.login(this.username, this.password).subscribe(
      (response) => {
        // Successful login
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        // Failed login
        this.loginError = 'Invalid username or password';
      }
    );
  }
}
