import { Component } from '@angular/core';
import { MissionsService } from './services/missions.service';
import { Mission } from './models/mission.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

   missions: Mission[] = [];

  constructor(private missionsService: MissionsService, private titleService: Title) {
    titleService.setTitle('ISpy');
    this.sortMissionsByCountry();
  }

  getMissions(): Mission[]{
    return this.missionsService.getMissions();
  }

  sortMissionsByAgents(): void{
    this.missions = this.missionsService.getMissionsByAgent();
  }

  sortMissionsByDate(): void{
    this.missions = this.missionsService.getMissionsByDate();
  }

  sortMissionsByCountry(): void{
    this.missions = this.missionsService.getMissionsByCountry();
  }

  sortMissionsByAddress(): void{
    this.missions = this.missionsService.getMissionsByAddress();
  }



  showMostIsolatedCountry(){
    console.log('Most isolated country is: ' + this.missionsService.getMostIsolatedCountry());
  }

}
