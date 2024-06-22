import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { userService } from '../../../services/userService.service';
import { Router } from '@angular/router';
import { adminService } from '../../../services/adminService';
import { updatesService } from '../../../services/updates.service';

@Component({
  selector: 'app-admin-update',
  templateUrl: './admin-update.component.html',
  styleUrl: './admin-update.component.scss'
})
export class AdminUpdateComponent implements OnInit {

  updateForm:FormGroup;

  timer: number = 3;
  countdownTimer: any; 
  hmm:any = [];
  constructor(private formBuilder:FormBuilder, 
    private snackbar:MatSnackBar, 
    public userService:userService,
    private router:Router,
    private admin_service:adminService,
    private updateService:updatesService
    ){
   
    if(!userService.isAnAdmin){
      this.snackbar.open("You dont have access to this route", "Ok",{
                  horizontalPosition: 'center',
                   verticalPosition: 'top',
                   duration:3000
        })
        this.startTimer();
        setTimeout(() => {
            router.navigate(['/home']);
        }, 3300);
    }
    this.updateForm = this.formBuilder.group({
      role: ['', Validators.required],
      updateDescription:['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.updateService.getUpdatesData().subscribe((data) => {
      this.hmm = data
    })
    console.log(this.hmm.length);
  }

  onSubmit(){
    if (this.updateForm.valid) {
      console.log('Form Submitted!', this.updateForm.value);
      // handle form submission logic here
      this.snackbar.open("Update Delivered", "Ok",{
                 horizontalPosition: 'center',
                  verticalPosition: 'top',
                  duration:3000
      })
      this.admin_service.addUpdate(this.updateForm, this.hmm.length);
      this.updateForm.reset();
    }else{

        this.snackbar.open("Not Valid form", "Ok")
    }
  }

  get formControls() {
    return this.updateForm.controls;
  }

  startTimer(): void {
    // Start a countdown timer that updates every second
    this.countdownTimer = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        // Redirect to home page when timer reaches 0
        clearInterval(this.countdownTimer);
        this.router.navigate(['/home']);
      }
    }, 1000);
  }
}
