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

    Object.keys(tmpDict).forEach((key) => {
      if (tmpDict[key].length === 1){
        const mission = tmpDict[key][0] as Mission;
        const country = mission.country;
        if (!this.isolationMap.hasOwnProperty(country)){
          this.isolationMap[country] = [];
        }
        this.isolationMap[country].push(mission);
      }
    });
  }
}
