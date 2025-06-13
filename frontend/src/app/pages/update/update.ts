import { Component, OnInit } from '@angular/core';
import { SharedUser } from '../../Shared Services/SharedUser';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/UserService/user-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update.html',
  styleUrls: ['./update.css']
})
export class Update implements OnInit {
  user: any = {};
  updateForm!: FormGroup;

  constructor(private userShared: SharedUser, private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userShared.userData.subscribe((data) => {
      this.user = data[0];

      // Now that user is available, initialize the form with default values
      this.updateForm = this.fb.group({
        full_name: [this.user.full_name || ""],
        email: [this.user.email || ""],
        date_of_birth: [this.user.date_of_birth || ""],
        phone_number: [this.user.phone_number || ""],
        address: [this.user.address || ""],
        profile_picture: [this.user.profile_picture || ""],
      });
    });
  }

  setUserData() {
    console.log(this.updateForm.value)

    this.userService.setUserData(this.updateForm.value).subscribe({
      next: (res) => {
        console.log('User updated successfully:', res);
        this.router.navigate([""])

      },
      error: (err) => {
        console.error('Error updating user:', err);
      }
    });

  }



  onSubmit() {
    if (this.updateForm.valid) {
      this.setUserData();

    } else {
      console.log('Form invalid');
    }
  }

}