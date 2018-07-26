import { Component, OnInit } from '@angular/core';
import {MissionsService} from '../services/missions.service';
import {Mission} from '../models/mission.model';

@Component({
  selector: 'app-isolated-missions',
  templateUrl: './isolated-missions.component.html',
  styleUrls: ['./isolated-missions.component.css']
})
export class IsolatedMissionsComponent implements OnInit {

  constructor(private missionsService: MissionsService) { }

  missions: Mission[];


  ngOnInit() {
    this.missions = Object.values(this.missionsService.getMostIsolatedCountry()) as Mission[];
  }

}
