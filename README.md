# JontxProject
Here you visit the actual page https://jontx-82210.web.app/home
OBS! even if you download this project you would need a folder called enviroments and in that folder you would need a enviroment.ts
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.2.
## TODO
Implement better UI for Login + register
Implement better UI for home?
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


## Firebase steps terminal
1. "Firebase login"
2. "firebase init hosting"
? What do you want to use as your public directory? dist/ng-nameOfProject 
? Configure as a single-page app (rewrite all urls to /index.html)? Yes
? Set up automatic builds and deploys with GitHub? No.
3. ng build
4. "firebase deploy"

## Firebase realtime database
using angularfiremodule makes it a lot easier to deal with database here is for the auth aswell
import { AngularFireModule } from '@angular/fire/compat';
when imported import -- { AngularFireDatabase } from '@angular/fire/compat/database'; --  just add it to constructor like "private db: AngularFireDatabase"
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
## ICONS
import {MatIconModule} from '@angular/material/icon'
https://www.angularjswiki.com/angular/angular-material-icons-list-mat-icon-list/
## Firebase setup for authentication


## For testing
npm install -g http-server
npx http-server -p 8080 -c-1 public
Hit CTRL-C to stop the server
