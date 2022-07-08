import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { CardsService } from './cards/cards.service';
import { PlayerComponent } from './player/player.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [CardsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
