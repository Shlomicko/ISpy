import {Injectable} from '@angular/core';
import {missions} from '../data/missions';
import {Mission} from '../models/mission.model';
import {setViewNext} from "@angular/core/src/render3/node_manipulation";

@Injectable({
  providedIn: 'root'
})
export class MissionsService {

  get numMissions(): number {
    return this._numMissions;
  }

  private missions: Mission[];
  private isolationMap: Object = {};
  private _numMissions = 0;

  constructor() {
    this.missions = [];
    this.createMissionsList();
  }

  getMissions(): Mission[] {
    return this.missions;
  }

  public getMissionsByDistanceFromHQ(): Mission[] {

    this.setFarMission();
    this.setNearMission();
    return this.missions;

  }

  private setFarMission(): void{
    let farestMission: Mission = this.missions[0];
    for (let i = 1; i < this.missions.length; i++) {
      const m = this.missions[i];
      if (m.distanceFromHQ > farestMission.distanceFromHQ) {
        farestMission = m;
      }
    }
    farestMission.farFromHQ = true;
  }

  private setNearMission(): void{
    let nearestMission: Mission = this.missions[0];
    for (let i = 1; i < this.missions.length; i++) {
      const m = this.missions[i];
      if (m.distanceFromHQ < nearestMission.distanceFromHQ) {
        nearestMission = m;
      }
    }
    nearestMission.nearToHQ = true;
  }



  getMissionsByDate(): Mission[] {
    return this.missions.sort((m1, m2) =>
      Date.parse(m1.date) - Date.parse(m2.date)
    );
  }

  getMissionsByAgent(): Mission[] {
    return this.missions.sort((m1, m2) => m1.agent.localeCompare(m2.agent));
  }

  getMissionsByCountry(): Mission[] {
    return this.missions.sort((m1, m2) => m1.country.localeCompare(m2.country));
  }

  getMissionsByAddress(): Mission[] {
    return this.missions.sort((m1, m2) => m1.address.localeCompare(m2.address));
  }

  getMostIsolatedCountry() {
    return this.isolationMap;
  }

  private createMissionsList() {

    const tmpDict = {};
    let counter = 0;
    for (const mission of missions) {
      const missionObject = new Mission().deserialize(mission);
      const key = missionObject.agent;
      if (!tmpDict.hasOwnProperty(key)) {
        tmpDict[key] = [];
      }

      tmpDict[key].push(missionObject);
      this.missions.push(missionObject);
      counter++;
    }
    this._numMissions = counter;
    this.createIsolationList(tmpDict);
  }

  private createIsolationList(dict: object): void {
    Object.keys(dict).forEach((key) => {
      if (dict[key].length === 1) {
        const mission = dict[key][0] as Mission;
        const country = mission.country;
        if (!this.isolationMap.hasOwnProperty(country)) {
          this.isolationMap[country] = [];
        }
        this.isolationMap[country].push(mission);
      }
    });
  }
}
