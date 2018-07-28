import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Mission} from '../models/mission.model';
import {Title} from '@angular/platform-browser';
import {MissionsService} from '../services/missions.service';
import {MapServiceService} from '../services/map-service.service';
import {MissionsCoordinatesManager} from '../helpers/missions-coordinates-manager';


@Component({
  selector: 'app-missions-view',
  templateUrl: './missions-view.component.html',
  styleUrls: ['./missions-view.component.css']
})
export class MissionsViewComponent implements OnInit {

  missions: Mission[] = [];
  numMissions = 0;
  private _coordinatesHelper: MissionsCoordinatesManager;

  constructor(private missionsService: MissionsService,
              private changeDetect: ChangeDetectorRef,
              private titleService: Title,
              private mapService: MapServiceService) {
    titleService.setTitle('ISpy');
    this.mapService.init(this.onMapServiceReady.bind(this));
  }

  private onMapServiceReady(): void {
    console.log('In mission-view.component, onMapServiceReady');
    this._coordinatesHelper = new MissionsCoordinatesManager(this.missionsService, this.mapService);
    this._coordinatesHelper.init(this.onMissionsCoordinatesReady.bind(this));
  }

  private onMissionsCoordinatesReady(): void{
    console.log('In mission-view.component, onMissionsCoordinatesReady');
    this.sortMissionsByDate();
    this.numMissions = this.missionsService.numMissions;
    this.changeDetect.detectChanges();
    console.log('In mission-view.component, this.numMissions: ' + this.numMissions);
  }

  public sortMissionsByAgents(): void {
    this.missions = this.missionsService.getMissionsByAgent();
  }

  public sortMissionsByDate(): void {
    this.missions = this.missionsService.getMissionsByDate();
  }

  public sortMissionsByCountry(): void {
    this.missions = this.missionsService.getMissionsByCountry();
  }

  public sortMissionsByAddress(): void {
    this.missions = this.missionsService.getMissionsByAddress();
  }

  ngOnInit() {
  }

}
