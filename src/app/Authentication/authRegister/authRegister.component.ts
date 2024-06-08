import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { userService } from "../../../services/userService.servive";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { UnderConstructionDialogComponent } from "../../../Dialogs/under-construction-dialog/under-construction-dialog.component";


@Component({
    selector: 'auth-register',
    templateUrl: './authRegister.component.html',
    styleUrls: ['./authRegister.component.scss'], 
})


export class AuthRegisterComponent implements OnInit{
    registerForm: FormGroup;
    isLogOrReg:boolean = true

    constructor(private fb: FormBuilder,  
      private afAuth: AngularFireAuth,
      private userService:userService,
      private router:Router,
      private dialog:MatDialog) {

          
      this.registerForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      });
      this.userService.isLoggedIn$.subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['/home']);
        }
      });
    }
    onRegister() {
        const { email, password } = this.registerForm.value;

        this.userService.registerUser(email, password).then(ok => {
        
        }).catch(Error => {
          throw Error
        });
       
    }

    ngOnInit(): void {
        
    }

    DiscordMediaLogin(){
      this.dialog.open(UnderConstructionDialogComponent,{
        autoFocus:false
      })
    }
}