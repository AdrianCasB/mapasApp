import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if (!navigator.geolocation){
  alert('Navegador sin geolocalización')
  throw new Error('Navegador sin geolocalización');
}


  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
