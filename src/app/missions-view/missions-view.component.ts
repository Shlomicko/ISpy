import {Component, OnInit} from '@angular/core';
import {Mission} from '../models/mission.model';
import {Title} from '@angular/platform-browser';
import {MissionsService} from '../services/missions.service';
import {MapServiceService} from '../services/map-service.service';
import {GeoPoint} from '../models/geo-point.model';


@Component({
  selector: 'app-missions-view',
  templateUrl: './missions-view.component.html',
  styleUrls: ['./missions-view.component.css']
})
export class MissionsViewComponent implements OnInit {

  missions: Mission[] = [];
  numMissions = 0;


  constructor(private missionsService: MissionsService, private titleService: Title, private mapService: MapServiceService) {
    titleService.setTitle('ISpy');
    this.numMissions = missionsService.numMissions;
    this.sortMissionsByDate();
    this.mapService.init(this.onMapServiceReady.bind(this));
  }

  readonly MI6_HQ_ADDRESS: string = '10 Downing St, Westminster, London SW1A 2AB, UK';
  private mi6Coordinates: GeoPoint;

  private onMapServiceReady(): void {

    this.mapService.getLatLongForAddress(this.MI6_HQ_ADDRESS, (geoPoint: GeoPoint) => {
      this.mi6Coordinates = geoPoint;
      this.setMissionsCoordinates();
    });

  }

  private setMissionsCoordinates(): void {
    console.log('MI6 Coordinates:' + this.mi6Coordinates);
    for (const mission of this.missions) {
      mission.setHQCoordinates(this.mi6Coordinates);
      mission.setLatAndLongCoordinates(this.mapService.newMapService);
    }

    setTimeout(() => {
      this.missions = this.missionsService.getMissionsByDistanceFromHQ();
      console.log(this.missions);
    }, 1000);

  }


  sortMissionsByAgents(): void {
    this.missions = this.missionsService.getMissionsByAgent();
  }

  sortMissionsByDate(): void {
    this.missions = this.missionsService.getMissionsByDate();
  }

  sortMissionsByCountry(): void {
    this.missions = this.missionsService.getMissionsByCountry();
  }

  sortMissionsByAddress(): void {
    this.missions = this.missionsService.getMissionsByAddress();
  }

  ngOnInit() {
  }

}
