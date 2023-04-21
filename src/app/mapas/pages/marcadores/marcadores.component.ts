import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { PlacesService } from '../../services/places.service';

interface Marcador {
  color: string;
  marker?: mapboxgl.Marker;
  coords?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container{
      width: 100%;
      height: 100%;
    }

    .list-group{
      z-index: 99;
      position: fixed;
      top: 20px;
      right: 20px;
    }
    li{
      cursor: pointer;
    }
    `
  ]
})

export class MarcadoresComponent implements AfterViewInit {



  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = this.placeService.userLocation || [-0.9962419013163848, 37.60883925849077];
  //Array de marcadores
  marcadores: Marcador[] = [];

  constructor( private placeService: PlacesService){}

  ngAfterViewInit(): void {


    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    //Al cargar el mapa 
    this.leerLocalStorage();

    //Creo un nuevo marker
    //   new mapboxgl.Marker()
    //     .setLngLat(this.center)
    //     .addTo(this.mapa);
    // }

  }

  agregarMarcador() {
    const color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));
    const nuevoMarcador = new mapboxgl.Marker(
      { draggable: true, color }
    )
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.marcadores.push(
      {
        color,
        marker: nuevoMarcador
      });

    nuevoMarcador.on('dragend', () => {
      this.guardarLocalStorage();
    });

    this.guardarLocalStorage();
  }

  irMarcador(marker: mapboxgl.Marker) {
    this.mapa.flyTo(
      {
        center: marker.getLngLat()
      })
  }

  guardarLocalStorage() {

    const marcadores: Marcador[] = [];

    this.marcadores.forEach(m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      marcadores.push({
        color,
        coords: [lng, lat]
      });
    })

    localStorage.setItem('marcadores', JSON.stringify(marcadores));

  }

  leerLocalStorage() {

    if (!localStorage.getItem('marcadores')) {
      return;
    }

    const marcadores: Marcador[] = JSON.parse(localStorage.getItem('marcadores')!);

    //Obtengo los marcadores y los represento en el mapa

    marcadores.forEach(m => {
      const marker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat(m.coords!)
        .addTo(this.mapa);

      //reconstruyo el array de marcadores
      this.marcadores.push({
        marker: marker,
        color: m.color
      });

      marker.on('dragend', () => {
        this.guardarLocalStorage();
      });

    });


  }

  borrarMarcador(index: number){
    
    this.marcadores[index].marker?.remove();
    this.marcadores.splice(index,1);
    this.guardarLocalStorage();
    
  }


}
