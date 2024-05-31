import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, onAuthStateChanged } from 'firebase/auth';
import { environment } from '../enviroments/enviroment'; // Corrected import path
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class userService {

    isLoggedIn$: Observable<boolean>;

  constructor(private afAuth: AngularFireAuth, private _snackBar:MatSnackBar) {
    this.isLoggedIn$ = this.afAuth.authState.pipe(
      map(user => !!user)
    );
  }

  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(user => {
        if(user){
            console.log(user);
            this._snackBar.open(`Welcome ${user.user?.email}`, ':D', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration:3000
              });
        }else{
            this._snackBar.open(`Cannot find that user`, 'sorry', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration:3000
              });
        }
    });
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
}