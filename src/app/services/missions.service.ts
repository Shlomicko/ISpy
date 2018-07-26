import { Injectable } from '@angular/core';
import {missions} from '../data/missions';
import {Mission} from '../models/mission.model';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {

  private missions: Mission[];
  private isolationMap: Object = {};


  constructor() {
    this.missions = [];
    this.createMissionsList();
  }

  getMissions(): Mission[]{
    return this.missions;
  }

  getMissionsByDate(): Mission[]{
    return this.missions.sort((m1, m2) =>
      Date.parse(m1.date) - Date.parse(m2.date)
    );
  }

  getMissionsByAgent(): Mission[]{
    return this.missions.sort((m1, m2) => m1.agent.localeCompare(m2.agent));
  }

  getMissionsByCountry(): Mission[]{
    return this.missions.sort((m1, m2) => m1.country.localeCompare(m2.country));
  }

  getMissionsByAddress(): Mission[]{
    return this.missions.sort((m1, m2) => m1.address.localeCompare(m2.address));
  }

  getMostIsolatedCountry(){
    return this.isolationMap;
  }

  private createMissionsList(){

    const tmpDict = {};
    for (const mission of missions){
      const missionObject = new Mission().deserialize(mission);
      const key = missionObject.agent;
      if (!tmpDict.hasOwnProperty(key)){
        tmpDict[key] = [];
      }

      tmpDict[key].push(missionObject);
      this.missions.push(missionObject);
    }

    this.createIsolationList(tmpDict);
  }

  private createIsolationList(dict: object): void{
    Object.keys(dict).forEach((key) => {
      if (dict[key].length === 1){
        const mission = dict[key][0] as Mission;
        const country = mission.country;
        if (!this.isolationMap.hasOwnProperty(country)){
          this.isolationMap[country] = [];
        }
        this.isolationMap[country].push(mission);
      }
    });
  }
}
