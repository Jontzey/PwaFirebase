import { Component, OnInit } from '@angular/core';
import { userService } from '../../services/userService.service';

@Component({
  selector: 'app-home',

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  _userService:any;
  hasAccess:boolean = true;
  searchTerm:any = "";
  userList:any = [];
  constructor(private userService: userService){
    this._userService = this.userService;

    if(!this._userService.isLoggedIn$){
      this.hasAccess = false;
    }
  }
  backgroundImg:any = '/assets/images/img9.jpg'
  img2:any = '/assets/images/pwaFirebase.png'
  img3:any = '/assets/images/img3.jpg'

  ngOnInit(): void {
      if(this.hasAccess){
        this.userService.getUsers().subscribe((users) => {
          this.userList = users;
        });
      }
  }
  get filteredUsers() {
    if (!this.searchTerm) {
      return null;
    }
    return this.userList.filter((user:any) =>
      user.displayName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
