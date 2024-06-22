
import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { userService } from "../../../services/userService.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { UnderConstructionDialogComponent } from "../../../Dialogs/under-construction-dialog/under-construction-dialog.component";

@Component({
  selector: 'auth-login',
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService:userService, private router:Router, private snackbar: MatSnackBar, private dialog:MatDialog) {
      this.loginForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]]
      });

      this.userService.isLoggedIn$.subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['/home']);
        }
      });
  }

  onLogin() {
    const { email, password } = this.loginForm.value;
      if(this.loginForm.valid){
        this.userService.login(email, password)
            .then(() => {
                console.log('User logged in successfully');
            })
            .catch((error) => {
                console.error('Error logging in:', error);
                this.snackbar.open(`Cannot find that user`, 'sorry', {
                  horizontalPosition: 'center',
                  verticalPosition: 'top',
                  duration:3000
                });
            });
      }else{
        this.snackbar.open(`Login form is not valid!`, ':(', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration:3000
        });
      }
}

DiscordMediaLogin(){
  this.dialog.open(UnderConstructionDialogComponent,{
    autoFocus:false
  })
}
}
