import {Injectable} from '@angular/core';
import {ScriptTag} from '../helpers/script-tag';
import {} from '@types/googlemaps';
import {GeoPoint} from '../models/geo-point.model';

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {

  get newMapService(): MapServiceService {
    return new MapServiceService();
  }

  constructor() {

  }

  private onReadyCallback: Function;

  readonly api_key: string = 'lalala';

  private _scriptLoaded = false;

  public init(callback: Function) {
    this.onReadyCallback = callback;
    this.loadScript('https://maps.googleapis.com/maps/api/js?libraries=geometry&key=' + this.api_key);
  }


  public getDistance(point1: GeoPoint, point2: GeoPoint): number {
    const p1: google.maps.LatLng = new google.maps.LatLng(point1.latitude, point1.longitude);
    const p2: google.maps.LatLng = new google.maps.LatLng(point2.latitude, point2.longitude);
    return google.maps.geometry.spherical.computeDistanceBetween(p1, p2);
  }

  public getLatLongForAddress(address: string): Promise<GeoPoint> {
    const promise = new Promise<GeoPoint>(function (resolve, reject) {
      const request: google.maps.GeocoderRequest = {};
      request.address = address;
      const geoCoder = new google.maps.Geocoder();
      geoCoder.geocode(request, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const location: google.maps.LatLng = results[0].geometry.location;
          resolve(new GeoPoint(location.lat(), location.lng()));
        } else {
          reject(status.toString().toLowerCase());
        }
      });
    });

    return promise;
  }

  private loadScript(url: string) {
    console.log('preparing to load...');
    if (this._scriptLoaded) {
      this.onReadyCallback();
    } else {
      const node = new ScriptTag();
      node.setSource(url)
        .setType('text/javascript')
        .onLodListener(this.onScriptLoaded.bind(this))
        .load();
      console.log('Url:' + url);
    }
  }

  private onScriptLoaded() {
    console.log('Inside onScriptLoaded:');
    this._scriptLoaded = true;
    if (this.onReadyCallback) {
      this.onReadyCallback();
    }
  }
}
