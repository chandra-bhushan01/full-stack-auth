import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/UserService/user-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css']
})
export class HomeComponent implements OnInit {
  constructor(private userServices: UserService, private cdr: ChangeDetectorRef) { }
  userData: any = [];

   router = inject(Router)

  ngOnInit(): void {
    this.getUserProfile(); 
  }



  getUserProfile() {
    this.userServices.getUserData().subscribe({

      next: (response) => {
        this.userData = response.Data; 
        this.cdr.detectChanges();
        console.log('User Data:', this.userData && this.userData.length > 0); 
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    }
    );
  }


  Logout(){
    localStorage.removeItem("authToken");
    this.router.navigate(['/login']);
    
  }

}
