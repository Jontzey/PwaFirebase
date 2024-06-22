import { Component } from '@angular/core';
import { userService } from '../../services/userService.service';

@Component({
  selector: 'app-home',

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  _userService:any;
  constructor(private userService: userService){
    this._userService = this.userService;
  }
  backgroundImg:any = '/assets/images/img9.jpg'
  img2:any = '/assets/images/pwaFirebase.png'
  img3:any = '/assets/images/img3.jpg'

}
