import {MissionsService} from '../services/missions.service';
import {MapServiceService} from '../services/map-service.service';
import {GeoPoint} from '../models/geo-point.model';
import {Mission} from '../models/mission.model';

export class MissionsCoordinatesManager {

  private _missionsService: MissionsService;
  private _mapService: MapServiceService;
  private _onComplete: Function;

  private _missionCoordinateAssignCounter = 0;

  readonly MI6_HQ_ADDRESS: string = '10 Downing St, Westminster, London SW1A 2AB, UK';
  private mi6Coordinates: GeoPoint;


  constructor(missionsService: MissionsService, mapService: MapServiceService) {
    this._missionsService = missionsService;
    this._mapService = mapService;
  }

  public init(onComplete: Function) {
    this._onComplete = onComplete;
    this.setHQCoordinates();
  }

  private setHQCoordinates(): void {
    this._mapService.getLatLongForAddress(this.MI6_HQ_ADDRESS, (geoPoint: GeoPoint) => {
      this.mi6Coordinates = geoPoint;
      this.setMissionsCoordinates();
    });
  }

  private setMissionsCoordinates(): void {
    console.log('MI6 Coordinates:' + this.mi6Coordinates);
    const missions = this._missionsService.getMissions();
    const numMissions = missions.length;
    console.log('numMissions: ' + numMissions);
    console.log('this._missionCoordinateAssignCounter: ' + this._missionCoordinateAssignCounter);
    let queryValid = true;
    for (const mission of missions) {
      const maps = this._mapService.newMapService;
      maps.getLatLongForAddress(mission.fullAddress, (geoPoint: GeoPoint, status: string) => {
        if(queryValid) {
          if (status !== 'ok') {
            queryValid = false;
            alert('Could not get coordinates, Google map status: ' + status + '\nPlease try again later.');
            this.setMissionsByDistanceFromHQ();
            return;
          }
          mission.missionCoordinates = geoPoint;
          mission.distanceFromHQ = maps.getDistance(mission.missionCoordinates, this.mi6Coordinates);
          console.log('onLocationReady, distance: ' + mission.distanceFromHQ + ' : ' + mission.country);
          this._missionCoordinateAssignCounter++;
          if (this._missionCoordinateAssignCounter >= numMissions) {
            this.setMissionsByDistanceFromHQ();
          }
        }
      });
    }
  }

  private setMissionsByDistanceFromHQ(): void {

    const missions = this._missionsService.getMissions();
    this.setFarMission(missions);
    this.setNearMission(missions);
    if (this._onComplete){
      this._onComplete();
    }
  }

  private setFarMission(missions: Mission[]): void {

    let farthestMission: Mission = missions[0];
    for (let i = 1; i < missions.length; i++) {
      const m = missions[i];
      if (m.distanceFromHQ > farthestMission.distanceFromHQ) {
        farthestMission = m;
      }
    }
    farthestMission.farFromHQ = true;
  }

  private setNearMission(missions: Mission[]): void {
    let nearestMission: Mission = missions[0];
    for (let i = 1; i < missions.length; i++) {
      const m = missions[i];
      if (m.distanceFromHQ < nearestMission.distanceFromHQ) {
        nearestMission = m;
      }
    }
    nearestMission.nearToHQ = true;
  }
}
