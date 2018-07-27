import {Injectable} from '@angular/core';
import {ScriptTag} from '../helpers/script-tag';
import {} from '@types/googlemaps';
import DirectionsRequest = google.maps.DirectionsRequest;
import UnitSystem = google.maps.UnitSystem;
import DirectionsResult = google.maps.DirectionsResult;
import DirectionsStatus = google.maps.DirectionsStatus;
import DirectionsService = google.maps.DirectionsService;

@Injectable({
  providedIn: 'root'
})
export class MapServiceService {

  constructor() {

  }

  readonly api_key: string = 'AIzaSyCIc9TG1ouuKLICMJrNdEX56tUhIwDj0js';

  private onReadyCallback: Function;

  private directionService: google.maps.DirectionsService;

  public init(onReady: Function) {
    this.onReadyCallback = onReady;
    this.directionService = new DirectionsService();
    this.loadScript('https://maps.googleapis.com/maps/api/js?key=' + this.api_key);
  }

  public getDistanceBetweenAddress(address1: string,
                                   address2: string,
                                   callback: (result: number, status: string) => void): void {
    this.directionService.route(this.getDirectionsRequest(address1, address2), this.onRouteResponse);
  }

  private loadScript(url: string) {
    console.log('preparing to load...');
    const node = new ScriptTag();
    node.setSource(url)
      .setType('text/javascript')
      .onLodListener(this.onScriptLoaded)
      .execute();
    console.log('Url:' + url);
  }

  private onScriptLoaded() {
    console.log('Inside onScriptLoaded:');
    if (this.onReadyCallback != null) {
      this.onReadyCallback();
    }
  }

  private getDirectionsRequest(address1: string, address2: string): DirectionsRequest {
    const request: DirectionsRequest = {};
    request.origin = address1;
    request.destination = address2;
    request.avoidFerries = false;
    request.avoidHighways = false;
    request.avoidTolls = false;
    request.unitSystem = UnitSystem.IMPERIAL;
    request.provideRouteAlternatives = false;
    return request;
  }

  private onRouteResponse(result: DirectionsResult, status: DirectionsStatus): void {

  }

}
