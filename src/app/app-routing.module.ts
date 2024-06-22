import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AppComponent } from './app.component';
import { AuthRegisterComponent } from './Authentication/authRegister/authRegister.component';
import { HomeComponent } from './home/home.component';
import { AuthLoginComponent } from './Authentication/auth-login/auth-login.component';
import { UpdateComponent } from './update/update.component';
import { ProfileComponent } from '../userHub/profile/profile.component';
import { AdminUpdateComponent } from './Admin/admin-update/admin-update.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
},
{ path: 'home', component: HomeComponent },
{path: 'auth/register', component: AuthRegisterComponent},
{path: 'auth/login', component:AuthLoginComponent},
{path:'updates', component:UpdateComponent},
{path:'profile', component:ProfileComponent},
{path:'create_update', component:AdminUpdateComponent},
{path:'contact', component:ContactComponent},
{ path: '**', redirectTo: 'home', pathMatch: 'full' } // Redirect unknown paths to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }