import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { DirectionsApiClient } from '../api/directionsApiClient';
import { Place } from '../interfaces/lugares.interface';
import { DirectionsResponse, Route } from '../interfaces/directions.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private directionsApi: DirectionsApiClient) { }

  private map?: mapboxgl.Map;
  private markers: mapboxgl.Marker[] = [];

  setMap(map: mapboxgl.Map) {
    this.map = map;
  }

  flyTo(coords: mapboxgl.LngLatLike) {
    this.map?.flyTo({
      zoom: 15,
      center: coords
    })
  }

  createMarkersFromPlaces(places: Place[], userLocation: [number, number]) {   //metodo para crear y añadir un marker al presionar en un lugar
    if (!this.map) throw Error('Mapa no inicializado');

    this.markers.forEach(marker => {
      marker.remove();
    });

    const newMarkers = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new mapboxgl.Popup()
        .setHTML(
          `<h6>${place.text}</h6>
            <span>${place.place_name}</span>`
        );

      const newMarker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map)

      newMarkers.push(newMarker);

      this.markers = newMarkers;

      //Limites del Mapa
      const bounds = new mapboxgl.LngLatBounds();

      bounds.extend(userLocation);
      newMarkers.forEach(marker => bounds.extend(marker.getLngLat()))

      this.map.fitBounds(bounds, {
        padding: 200
      })
    }
  }

  getRouteBeetwenPoints(start: [number, number], end: [number, number]) {
    this.directionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
      .subscribe(resp => {
        this.drawRoute(resp.routes[0]);
      })
  }

  private drawRoute(route: Route) {

    //ajustar el mapa a la ruta

    const coords = route.geometry.coordinates;
    const bounds = new mapboxgl.LngLatBounds();

    coords.forEach(([lng, lat]) => {

      bounds.extend([lng, lat])
    })

    this.map?.fitBounds(bounds, {
      padding: 200
    });

    //Dibujar la ruta a recorrer por el usuario

    if(this.map?.getLayer('RouteString')){
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }

    const sourceData: mapboxgl.AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    this.map?.addSource('RouteString',sourceData);
    this.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        "line-join":'round'
      },
      paint: {
        "line-color": 'blue',
        'line-width': 3
      }
    });
  }

}
