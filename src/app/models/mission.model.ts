import {IDeserializable} from './ideserializable.model';
import {MapServiceService} from '../services/map-service.service';
import {GeoPoint} from './geo-point.model';

export class Mission implements IDeserializable {

  get distanceFromHQ(): number {
    return this._distanceFromHQ;
  }

  get missionCoordinates(): GeoPoint {
    return this._missionCoordinates;
  }

  get hqCoordinates(): GeoPoint {
    return this._hqCoordinates;
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

  private _hqCoordinates: GeoPoint;
  private _missionCoordinates: GeoPoint;
  private _distanceFromHQ: number;

  private _fullAddress: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    this._fullAddress = this.address + ', ' + this.country;
    return this;
  }

  public setLatAndLongCoordinates(maps: MapServiceService): void {
    maps.getLatLongForAddress(this.fullAddress, (geoPoint) => {
      this._missionCoordinates = geoPoint;
      this._distanceFromHQ = maps.getDistance(this.missionCoordinates, this.hqCoordinates);
      console.log('onLocationReady, distance: ' + this.distanceFromHQ + ' : ' + this.country);
    });
  }

  public setHQCoordinates(geoPoint: GeoPoint): void{
    this._hqCoordinates = geoPoint;
  }
}


