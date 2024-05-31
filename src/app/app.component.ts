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

  }
}
