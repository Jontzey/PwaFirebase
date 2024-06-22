import { Component, OnInit } from '@angular/core';
import { userService } from '../../services/userService.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  
    profileForm: FormGroup;
    user: any;
    toggleEditMode:boolean = false;
  constructor(
    private userService:userService, 
    private router:Router, 
    private fb: FormBuilder,
  
  ){
    this.userService.isLoggedIn$.subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.router.navigate(['/home']);
      }
    });
    this.profileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      displayName: ['', Validators.required],
      profileImage: ['']
    });
  }



  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => {
      if (user) {
        this.user = user;
        this.profileForm = this.fb.group({
          email: [user.email, [Validators.required, Validators.email]],
          displayName: [user.displayName, Validators.required],
          profileImage: [user.photoURL, Validators.required]
        });
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const { email, displayName, profileImage } = this.profileForm.value;
      setTimeout(() => {
        this.toggleEditMode = false;
      },700)
      this.userService.updateUserProfile(this.user, email, displayName, profileImage).subscribe({
        error: error => {
          console.error('Error updating profile:', error);
        }
      });
    }
  }

  toggleEdit(){
    this.toggleEditMode = !this.toggleEditMode;
    console.log(this.toggleEditMode);
  }
}
