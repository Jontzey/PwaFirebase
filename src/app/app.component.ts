import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { userService } from '../services/userService.servive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], 
})
export class AppComponent implements OnInit{
  title = 'jontxProject';
  constructor(public userService:userService){

  }

  ngOnInit(): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      }).catch(function(error) {
        console.log('Service Worker registration failed:', error);
      });
    }
  }
}
