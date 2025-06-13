import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/AuthService/auth-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SocketService } from '../../services/SocketService/socket';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
  standalone: true

})
export class LoginPage {
  loginForm: FormGroup;
  registerForm: FormGroup;
  registerError: any = '';
  errorMessage: any = '';


  isLoginForm = true;


  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router, private ws: SocketService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]

    })


    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],

      },

    );

  }




  userLogin(email: string, password: string) {
    // using the web sockets 
    this.ws.connect();
    this.ws.emit("message", "hello from angular forntend");
    this.ws.on<string>('messageReply').subscribe((msg) => {
      console.log("📨 Received from backend:", msg);
    });




    this.errorMessage = null; // Clear any previous errors
    this.authService.userLogin(email, password).subscribe({
      next: (response) => {

        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Login successful, but no token received.';
          console.warn('Login successful, but no token received:', response);
        }
      },
      error: (error) => {

        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'An unexpected error occurred during login.';
        }
      }
    });
  }

  userSignup(name: string, email: string, password: string) {
    this.authService.userSignup(name, email, password).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.isLoginForm = true;
        this.registerError = '';

      },
      error: (err) => {
        console.log(err)



      }
    })
  }


  toggleForm() {
    this.isLoginForm = !this.isLoginForm;


  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      console.log('Form data:', this.loginForm.value);
      this.userLogin(this.loginForm.value.email, this.loginForm.value.password)
    } else {
      this.loginForm.markAllAsTouched(); // Show validation messages
    }
  }

  onRegisterSubmit() {
    if (this.registerForm.valid) {
      console.log('Form data:', this.registerForm.value);
      this.userSignup(this.registerForm.value.name, this.registerForm.value.email, this.registerForm.value.password)
    } else {
      this.registerForm.markAllAsTouched(); // Show validation messages
    }

  }


}
