import { Component } from '@angular/core';
import { GameService } from '../../services/game.service';
import { MatDialog } from '@angular/material/dialog';
import { SelectorDialogComponent } from '../selector-dialog/selector-dialog.component';
import { advanceRocketLocation, advanceTurns, Game, goToLocation, Location, MoveRocketLocation, turnCompleted } from 'space-parks-engine';
import { NetworkService } from '../../../shared/services/network.service';
import { filter, map, pluck, tap } from 'rxjs/operators';
import { isSuccess } from 'src/app/shared/models/remote-data.model';



@Component({
  selector: 'game-board',
  templateUrl: './game-board.component.html',
  styleUrls: [
    './game-board.component.scss'
  ]
})
export class GameBoardComponent {

  constructor(
    public readonly networkService: NetworkService,
    public readonly dialog: MatDialog
  ) {}

  game$ = this.networkService.game$
    .pipe(
      filter(isSuccess),
      map(x => x.value)
    );

  onLocationClicked(location: string): void {

    // this.networkService.sendMessage(goToLocation(this.networkService.room, location));
    // this.networkService.sendMessage(turnCompleted(this.networkService.room));

    this.dialog.open(SelectorDialogComponent, {
      data: {
        title: 'Select next Location',
        options: this.networkService.game$
          .pipe(
            filter(isSuccess),
            pluck('value'),
            map(x => x.locations.filter((loc: Location) => loc.name !== location && !loc.activeLocation).map(x => x.name))
          )
      }
    })
    .afterClosed()
    .subscribe((result: string) => {
      console.log(result);
      const moveLocAction: MoveRocketLocation = {
        type: 'move-rocket-location',
        to: result,
        from: location,
        room: this.networkService.room
      };

      this.networkService.sendMessage(goToLocation(this.networkService.room, location));
      this.networkService.sendMessage(moveLocAction);
      this.networkService.sendMessage(turnCompleted(this.networkService.room));

      // this.gameService.processVisitLocation(locationNumber);
      // console.log(this.gameService.game);
    })
  }
}


