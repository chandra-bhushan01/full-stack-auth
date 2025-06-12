import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/UserService/user-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedUser } from '../../Shared Services/SharedUser';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css']
})
export class HomeComponent implements OnInit {
  constructor(private userServices: UserService, private cdr: ChangeDetectorRef, private sharedUser: SharedUser) { }
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

        this.sharedUser.userData.next(this.userData);
      },
      error: (err) => {
        console.log("Error due to SSR. IGNORE")
      }
    }
    );

  }


  Logout() {
    localStorage.removeItem("authToken");
    this.sharedUser.userData.next(this.userData);
    this.router.navigate(['/login']);

  }

  EditDetails() {
    // this.sharedUser.setUser(this.userData);
    this.router.navigate(["/update"])
  }

}
