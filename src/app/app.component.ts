import { Component, OnInit } from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import { environment } from 'src/environments/environment';
import { PlacesService } from './mapas/services/places.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private placesService: PlacesService){

  }

  get isUserLocationReady(){
    return this.placesService.isUserLocationReady;
  }

  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;
   }
  
}
