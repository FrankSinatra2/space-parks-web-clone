import { NgModule } from '@angular/core';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { GameBoardLocationComponent } from './components/game-board-location/game-board-location.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { GameService } from './services/game.service';
import { PlayerCardComponent } from './components/player-card/player-card.component';
import { SelectorDialogComponent } from './components/selector-dialog/selector-dialog.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    GameBoardComponent,
    GameBoardLocationComponent,
    PlayerCardComponent,
    SelectorDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    GameService
  ],
  entryComponents: [
    SelectorDialogComponent
  ]
})
export class GameModule {}