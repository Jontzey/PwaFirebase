import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppComponent } from './app.component'; // Import your main component here
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthRegisterComponent } from './Authentication/authRegister/authRegister.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AppRoutingModule } from './app-routing.module';
import {MatSelectModule} from '@angular/material/select';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { enviroment } from '../enviroments/enviroment';
import { userService } from '../services/userService.service';
import {MatIconModule} from '@angular/material/icon'
import { AuthLoginComponent } from './Authentication/auth-login/auth-login.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UnderConstructionDialogComponent } from '../Dialogs/under-construction-dialog/under-construction-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { HomeComponent } from './home/home.component';
import { UpdateComponent } from './update/update.component';
import { ProfileComponent } from '../userHub/profile/profile.component';
import { AdminUpdateComponent } from './Admin/admin-update/admin-update.component';
import { adminService } from '../services/adminService';
import { ContactComponent, contactModalComponent } from './contact/contact.component';
@NgModule ({
  declarations: [
    AppComponent,
    AuthRegisterComponent,
    AuthLoginComponent,
    MainLayoutComponent,
    UnderConstructionDialogComponent,
    HomeComponent,
    UpdateComponent,
    ProfileComponent,
    AdminUpdateComponent,
    ContactComponent,
    contactModalComponent

  ],
  providers: [
    userService,adminService
  ],
  imports: [
    BrowserModule, // Import BrowserModule if you are running in a browser environment
    MatSlideToggleModule,
    MatButtonModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    AppRoutingModule,
    AngularFireAuthModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    AngularFireModule.initializeApp(enviroment.firebaseConfig),
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA] // Specify the main component to bootstrap here
})
export class AppModule {}