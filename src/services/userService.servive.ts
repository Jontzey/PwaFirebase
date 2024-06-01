import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set } from "firebase/database";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root'
})
export class userService {

    isLoggedIn$: Observable<boolean>;
    currentUser$: Observable<firebase.User | null>;
    
  constructor(private afAuth: AngularFireAuth, private _snackBar:MatSnackBar, private db: AngularFireDatabase) {
    //observes the auth state and hold current user
    this.currentUser$ = this.afAuth.authState;
    this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user));
  }
    /// AUTHENTICATION FUNCTIONS
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

  registerUser(email:string, password:string){
    return this.afAuth.createUserWithEmailAndPassword(email, password) // Use AngularFireAuth
    .then((userCredential) => {
        console.log('User registered:', userCredential.user);
        this.db.object('users/' + userCredential.user?.uid).set({
          email:email,
          dateCreated:Date.now(),
          displayName:userCredential.user?.displayName,
          profileImage:userCredential.user?.photoURL
        })
        return this.login(email, password);
    })
    .catch((error) => {
        console.error('Error registering user:', error);
    });
  }
  logout(): Promise<void> {
    return this.afAuth.signOut().then(t => {
      this._snackBar.open(`You are now logged out`, 'Ok', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration:3000
      });
    });
  }
  getCurrentUser() {
    return this.afAuth.authState;
  }
  /////////////////////////////////////
  ////////////////////////////////////

  updateUserProfile(user: any, email: string, displayName: string, profileImage: string): Observable<void> {
    return new Observable<void>(observer => {
      user.updateProfile({ displayName, photoURL: profileImage })
        .then(() => user.updateEmail(email))
        .then(() => this.db.object('users/' + user.uid).update({
          email,
          displayName,
          profileImage
        }))
        .then(() => {
          this._snackBar.open('Profile updated successfully', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          observer.next(); // Emit completion signal
          observer.complete(); // Complete the observable
        })
        .catch((error:any) => {
          console.error('Error updating profile:', error);
          this._snackBar.open('Error updating profile', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          observer.error(error); // Emit error
        });
    });
  }
}