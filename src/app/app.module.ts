import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { CardsService } from './cards/cards.service';
import { PlayerComponent } from './player/player.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SideBetModalComponent } from './side-bet-modal/side-bet-modal.component';
import { CheatSheetModalComponent } from './cheat-sheet-modal/cheat-sheet-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    PlayerComponent,
    SideBetModalComponent,
    CheatSheetModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [CardsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
