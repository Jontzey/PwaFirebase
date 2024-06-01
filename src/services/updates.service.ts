import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set } from "firebase/database";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
@Injectable({
  providedIn: 'root'
})
export class updatesService {

    
  constructor(private afAuth: AngularFireAuth, private _snackBar:MatSnackBar, private db: AngularFireDatabase) {

  }

    getUpdatesData(){
      const path = "/updates";

      return this.db.list(path).valueChanges();
    }
}