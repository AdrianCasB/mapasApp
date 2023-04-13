import { Component } from '@angular/core';

interface Propiedad {
  titulo: string;
  descripcion: string;
  lngLat: [number, number];
}

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html'
})
export class PropiedadesComponent {

  propiedades: Propiedad[] = [
    {
      titulo: 'ODILO Cartagena',
      descripcion: 'Oficinas de ODILO en Cartagena',
      lngLat: [-0.9555893846855715, 37.61764535815234]
    },
    {
      titulo: 'ODILO Madrid',
      descripcion: 'Oficinas de ODILO en Madrid',
      lngLat: [-3.691115344148966, 40.4320749097159]
    },
    {
      titulo: 'Teatro Romano de Cartagena',
      descripcion: 'Monumento histórico de la ciudad de Cartagena',
      lngLat: [-0.9839073883850508,37.599439487324844]
    },
    {
      titulo: 'Local comercial, España',
      descripcion: 'Local comercial disponible en Madrid, España, cerca de El Jardín Secreto.',
      lngLat: [-3.7112735618380177, 40.42567285425766]
    },
  ]

}
