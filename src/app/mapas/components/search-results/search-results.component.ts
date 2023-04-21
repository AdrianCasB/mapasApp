import { Component } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { Place } from '../../interfaces/lugares.interface';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

   public selectedId : string = '';

  constructor(private placesService: PlacesService,
    private mapService: MapService) { }

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces;
  }

  get places(): Place[] {
     return this.placesService.places;
     
  }

  flyTo(place: Place) {
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this.mapService.flyTo([lng, lat]);
    
  }

  getDirections(place: Place){
    
    if(!this.placesService.userLocation) throw Error('No se encuentra la localización');
    
    this.placesService.deletePlaces();

    const start = this.placesService.userLocation;
    const end = place.center as [number,number];

    this.mapService.getRouteBeetwenPoints(start,end);
  }

}
