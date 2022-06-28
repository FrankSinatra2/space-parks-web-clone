import { Route, RouterModule } from '@angular/router';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { NgModule } from '@angular/core';
import { GameModule } from './game.module';

const routes: Route[] = [
  {
    path: '',
    component: GameBoardComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    GameModule
  ],
  exports: [
    RouterModule,
    GameModule
  ]
})
export class GameRoutingModule {}
