import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/AuthService/auth-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
  registerError:any = '';
  errorMessage:any = '';
  

  isLoginForm = true;


  constructor(private authService: AuthService, private fb: FormBuilder , private router:Router) {
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




  userLogin(email:string, password:string) {
    this.errorMessage = null; // Clear any previous errors
    this.authService.userLogin(email, password).subscribe({
      next: (response) => {
       
        if (response && response.token) {
          // Store the token in localStorage
          localStorage.setItem('authToken', response.token);
          console.log('Login successful! Token stored in localStorage.');
          this.router.navigate(['']); // Navigate to home route after successful login and token storage
        } else {
          // Handle cases where token might be missing in a successful response
          this.errorMessage = 'Login successful, but no token received.';
          console.warn('Login successful, but no token received:', response);
        }
      },
      error: (error) => {
        // Handle login errors (e.g., invalid credentials, network issues)
        console.error('Login failed:', error);
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message; // Display specific error message from backend
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
        console.log(err);
        console.log(err.error);
        console.log(err.error.Message);


        this.registerError =  err.error.Message;
        
        
        
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
