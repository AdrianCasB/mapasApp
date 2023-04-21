import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Place, PlacesResponse } from '../interfaces/lugares.interface';
import { PlacesApiClient } from '../api/placesApiClient';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Place[] = [];

  get isUserLocationReady(): boolean {
    return !!this.userLocation; //devuelve true si existe la localización
  }

  constructor(private placesApi: PlacesApiClient,
              private mapService: MapService) { this.getUserLocation() }


  getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
          resolve(this.userLocation);
        },
          (err) => {
            alert('No se pudo obtener la geolocalización');
            console.log(err);
            reject();
          }
        )
      }, 1500);
    })
  }

  getPlacesByQuery(query: string = '') {
    if (query.length === 0) {
      this.places= [];
      this.isLoadingPlaces = false;
      return;
    } else {

      this.isLoadingPlaces = true;

      this.placesApi.get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this.userLocation?.join(',') || [-0.9962419013163848, 37.60883925849077],
          country: 'es'
        }
      })
        .subscribe(resp => {
          this.isLoadingPlaces = false;
          this.places = resp.features;

          this.mapService.createMarkersFromPlaces(this.places,this.userLocation!);
        })
    }
  }


  deletePlaces(){
    this.places = [];
  }

}

