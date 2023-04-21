import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as mapboxgl from "mapbox-gl";
import { PlacesService } from '../../services/places.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
    #mapa{
      width: 100%;
      height: 100%;
    }

    .list-group{
      z-index: 99;
      position: fixed;
      top: 20px;
      right: 20px;
      margin-top: 20px;
    }
    li{
      cursor: pointer;
    }
    `
  ]
})
export class FullScreenComponent implements AfterViewInit {

  constructor(private placeService: PlacesService,
              private mapService : MapService ){}
  
  map !: mapboxgl.Map;
  

  ngAfterViewInit(): void {

    this.map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.placeService.userLocation,
      zoom: 15
    });

    const popup = new mapboxgl.Popup()
      .setHTML(`
      <h6>Aquí estoy</h6>
      <span>Coordenadas : ${this.placeService.userLocation}</span>
      `);

      new mapboxgl.Marker({color:'red'})
        .setLngLat(this.placeService.userLocation!)
        .setPopup(popup)
        .addTo(this.map)

    this.mapService.setMap(this.map);
  }


  irMarcador() {
    this.map.flyTo(
      {
        center: this.placeService.userLocation,
        zoom: 16
      })
  }

  

}
