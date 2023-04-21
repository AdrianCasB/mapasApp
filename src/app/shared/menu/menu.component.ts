import { Component } from '@angular/core';

interface MenuItem {
  ruta: string;
  nombre: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles : [
    `
    li{cursor: pointer;}
    `
  ]
})
export class MenuComponent {

  menuItems : MenuItem[] = [
    {
      ruta: '/fullscreen',
      nombre:'FullScreen'
    },
    {
      ruta: '/marcadores',
      nombre:'Marcadores'
    },
    {
      ruta: '/zoomrange',
      nombre:'Zoom Range'
    },
    {
      ruta: '/propiedades',
      nombre:'Propiedades'
    }
    
  ]

}
