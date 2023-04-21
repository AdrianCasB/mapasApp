import { Component } from '@angular/core';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  constructor(private placesService : PlacesService){}

  private timer ?: NodeJS.Timeout;

    onQueryChanged(query : string){
        if(this.timer) clearTimeout(this.timer); //si existe un tiempo de debounde, lo limpiamos
        
        this.timer = setTimeout(() => {
          this.placesService.getPlacesByQuery(query);  //obtenemos las respuestas a partir de lo que introduce el usuario (query)
        }, 350);
    }
}
