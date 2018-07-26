import { Component, OnInit } from '@angular/core';
import { Mission } from '../models/mission.model';
import { Title } from '@angular/platform-browser';
import {MissionsService} from '../services/missions.service';


@Component({
  selector: 'app-missions-view',
  templateUrl: './missions-view.component.html',
  styleUrls: ['./missions-view.component.css']
})
export class MissionsViewComponent implements OnInit {

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

  ngOnInit() {
  }

}
