export class GeoPoint {

  get longitude(): number {
    return this._longitude;
  }
  get latitude(): number {
    return this._latitude;
  }

  constructor(lat: number, lng: number){
    this._latitude = lat;
    this._longitude = lng;
  }
  private _latitude: number;

  private _longitude: number;

  public toString(): string{
    return 'GeoPoint::Latitude: ' + this.latitude + ', Longitude: ' + this.longitude;
  }

}
