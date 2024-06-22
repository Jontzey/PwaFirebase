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
export class adminService {
    updateLength:any;
    //date, description,role,title
  constructor(
    private afAuth: AngularFireAuth,
     private _snackBar:MatSnackBar,
      private db: AngularFireDatabase,
        
    ) {
 
  }

addUpdate(form:any, updateNumber:any){

  updateNumber + 1;
  let formData = form.value;
  console.log(formData);
  this.db.list(`updates`).update(`update${updateNumber}`,{
      date: new Date(),
      role: formData.role,
      description: formData.updateDescription,
      title:`Update ${updateNumber}`
       
    })
    .then(() => {
      console.log("Update added successfully!");
    })
    .catch(error => {
      console.error("Error adding update:", error);
    });
}
}