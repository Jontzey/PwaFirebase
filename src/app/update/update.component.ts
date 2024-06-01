import { Component, OnInit, isDevMode } from '@angular/core';
import { updatesService } from '../../services/updates.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit {
  updates: any[] = [
    // { role:'Developer' ,title: 'Update 1', description: 'Routes and Firebase email and password authentication has been added. The html will change depending on the state with if a user is logged in', date: new Date() },
    // { role:'Developer' , title: 'Update 2', description: 'Small bug fixes with animation making an scroll appear because of too long travel distance', date: new Date() },
    // {role:'Developer', title: 'Update 3', description: 'There is now an Update route/component which will inform users and also developer about added content ', date: new Date() }
  ]

  constructor(private updateService:updatesService){
    this.updateService.getUpdatesData().subscribe((data) => {
      this.updates = data.reverse();
      if(isDevMode()){
        console.log(this.updates);
      }
    });
  }


  ngOnInit(): void {
    
  }
}
