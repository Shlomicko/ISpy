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
    this._mapService.init(this.setHQCoordinates.bind(this));
  }

  private setHQCoordinates(): void {

    const self = this;
    this._mapService.getLatLongForAddress(this.MI6_HQ_ADDRESS)
      .then(function (geoPoint) {
        self.mi6Coordinates = geoPoint;
        self.setMissionsCoordinates().then(function (result) {
          self.setMissionsByDistanceFromHQ();
        });
      });
  }

  private setMissionsCoordinates(): Promise<any> {
    console.log('MI6 Coordinates:' + this.mi6Coordinates);
    const missions = this._missionsService.getMissions();
    return Promise.all(missions.map(this.getMissionCoordinatesFromAddress.bind(this)));
  }

  private getMissionCoordinatesFromAddress(mission: Mission): Promise<GeoPoint> {
    return new Promise((resolve, reject) => {
      const mapServiceInstance = this._mapService.newMapService;
      mapServiceInstance.getLatLongForAddress(mission.fullAddress).then(geoPoint => {
        mission.missionCoordinates = geoPoint;
        mission.distanceFromHQ = mapServiceInstance.getDistance(geoPoint, this.mi6Coordinates);
        resolve(geoPoint);
      }).catch(function (error) {
        reject(error);
      });
    });
  }

  private setMissionsByDistanceFromHQ(): void {
    console.log('All coordinates ready...maybe');
    const missions = this._missionsService.getMissions();
    this.setFarMission(missions);
    this.setNearMission(missions);
    if (this._onComplete) {
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
