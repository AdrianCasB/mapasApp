import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { LoadingComponent } from './mapas/components/loading/loading.component';
import { SearchBarComponent } from './maps/components/search-bar/search-bar.component';
import { MapasModule } from './mapas/mapas.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SearchBarComponent
  ],
  imports: [
    MapasModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
