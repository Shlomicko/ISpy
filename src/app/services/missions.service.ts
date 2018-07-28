import {Injectable} from '@angular/core';
import {missions} from '../data/missions';
import {Mission} from '../models/mission.model';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {

  get numMissions(): number {
    return this._numMissions;
  }

  private _missions: Mission[];
  private _isolationMap: Object = {};
  private _numMissions = 0;

  constructor() {
    this._missions = [];
    this.createMissionsList();
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
      this._missions.push(missionObject);
      counter++;
    }
    this._numMissions = counter;
    this.createIsolationList(tmpDict);
  }

  public getMissionsByDate(): Mission[] {
    return this._missions.sort((m1, m2) =>
      Date.parse(m1.date) - Date.parse(m2.date)
    );
  }

  public getMissionsByAgent(): Mission[] {
    return this._missions.sort((m1, m2) => m1.agent.localeCompare(m2.agent));
  }

  public getMissionsByCountry(): Mission[] {
    return this._missions.sort((m1, m2) => m1.country.localeCompare(m2.country));
  }

  public getMissionsByAddress(): Mission[] {
    return this._missions.sort((m1, m2) => m1.address.localeCompare(m2.address));
  }

  public getMostIsolatedCountry() {
    return this._isolationMap;
  }

  public getMissions(): Mission[]{
    return this._missions;
  }

  private createIsolationList(dict: object): void {
    Object.keys(dict).forEach((key) => {
      if (dict[key].length === 1) {
        const mission = dict[key][0] as Mission;
        const country = mission.country;
        if (!this._isolationMap.hasOwnProperty(country)) {
          this._isolationMap[country] = [];
        }
        this._isolationMap[country].push(mission);
      }
    });
  }


}
