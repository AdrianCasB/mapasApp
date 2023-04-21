import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { PlacesService } from '../../services/places.service';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container{
      width: 100%;
      height: 100%;
    }

    .row{
      background-color: white;
      bottom: 50px;
      left:90px;
      padding: 10px;
      position:fixed;
      z-index:999;
      width: 400px;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  ngOnDestroy(): void {
    this.mapa.off('zoom', ()=>{});
    this.mapa.off('zoomend', ()=>{});
    this.mapa.off('move', ()=>{});
  }

  constructor( private placeService: PlacesService){}

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 16;
  center: [number,number] = this.placeService.userLocation || [-0.9962419013163848, 37.60883925849077];

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });


    //EventListener para que al hacer zoom capturemos el zoom despues del efecto
    this.mapa.on('zoom', () => {
      this.zoomLevel = this.mapa.getZoom();
    })

    //Listener para no dejar hacer zoom mayor de 18pt
    this.mapa.on('zoomend', () => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18)
      }
    });


    //Movimiento del mapa
    this.mapa.on('move', (event) => {
      const { lng, lat } = event.target.getCenter(); //event.target.getCenter() es un objeto de tipo mapboxgl
    this.center = [lng,lat];
    })

  }

  zoomOut() {
    this.mapa.zoomOut();
    this.zoomLevel = this.mapa.getZoom();
  }

  zoomIn() {
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom();

  }

  zoomCambia(valor: string) {
    this.mapa.zoomTo(Number(valor));
  }

}
