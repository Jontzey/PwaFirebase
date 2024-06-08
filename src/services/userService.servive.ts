import { Injectable, isDevMode } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set } from "firebase/database";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, from, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { enviroment } from '../enviroments/enviroment';
@Injectable({
  providedIn: 'root'
})
export class userService {

    isLoggedIn$: Observable<boolean>;
    currentUser$: Observable<firebase.User | null>;
    user:any;
    adminUid = enviroment.adminUid;
    private _isAdmin = new BehaviorSubject<boolean>(false);
    isAdmin = this._isAdmin.asObservable();
    test:any;

    tempAccount = {
      tempDisplayName: 'tempUsername',
      tempImg: 'assets/images/img9.jpg'
    }
  constructor(private afAuth: AngularFireAuth, private _snackBar:MatSnackBar, private db: AngularFireDatabase) {
    //observes the auth state and hold current user
    this.currentUser$ = this.afAuth.authState;
    this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user));
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
       console.log(user);
       if(user.uid === enviroment.adminUid){
          this.test = true;
       }else{
        this.test = false;
       }
      } else {
       this.test = false;
      }
    });
  }
    /// AUTHENTICATION FUNCTIONS
  login(email: string, password: string): Promise<any> {
    return this.afAuth.signInWithEmailAndPassword(email, password).then(user => {
        if(user){
          if(isDevMode()){
            console.log(user);
            console.log(user.user?.uid);
          }

          if(user.user?.uid === this.adminUid){
            console.log("admin konto here");
            this._isAdmin.next(true);
          }
          else{
            this._isAdmin.next(false);
          }
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
      if(isDevMode()){
        console.log('User registered:', userCredential.user);

      }
          userCredential.user?.updateProfile({displayName:this.tempAccount.tempDisplayName, photoURL:this.tempAccount.tempImg}).then(t =>{
          this.db.object('users/' + userCredential.user?.uid).set({
            email:email,
            dateCreated:Date.now(),
            displayName:userCredential.user?.displayName,
            profileImage:userCredential.user?.photoURL
          })

          return this.login(email, password);
        })
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
      this._isAdmin.next(false);
      localStorage.clear();
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