import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  fullname: string = '';
  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    const userData = {
      fullname: this.fullname,
      username: this.username,
      password: this.password,
    };

    this.userService.registerUser(userData).subscribe(
      (response: any) => {
        // Registration successful
        console.log('Registration successful', response);
        // Redirect to login page
        this.router.navigate(['/login']);
      },
      (error: any) => {
        // Registration failed
        console.error('Registration failed', error);
        // Handle error or display error message to the user
      }
    );
  }
}
