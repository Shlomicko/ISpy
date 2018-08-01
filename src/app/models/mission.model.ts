import {IDeserializable} from './ideserializable.model';
import {GeoPoint} from './geo-point.model';

export class Mission implements IDeserializable {
  set distanceFromHQ(value: number) {
    this._distanceFromHQ = value;
    console.log('MissionModel, distance from HQ: ' + value, this.agent, this.country);
  }
  set missionCoordinates(value: GeoPoint) {
    this._missionCoordinates = value;
  }

  get distanceFromHQ(): number {
    return this._distanceFromHQ;
  }

  get missionCoordinates(): GeoPoint {
    return this._missionCoordinates;
  }

  get fullAddress(): string {
    return this._fullAddress;
  }

  farFromHQ?: boolean;
  nearToHQ?: boolean;

  agent: string;
  country: string;
  address: string;
  date: string;

  private _missionCoordinates: GeoPoint;
  private _distanceFromHQ: number;

  private _fullAddress: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    this._fullAddress = this.address + ', ' + this.country;
    return this;
  }
}


