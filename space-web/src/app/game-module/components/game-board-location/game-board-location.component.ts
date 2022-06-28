import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Location, GameAction } from 'space-parks-engine';



@Component({
  selector: 'game-board-location',
  templateUrl: './game-board-location.component.html',
  styleUrls: [
    './game-board-location.component.scss'
  ]
})
export class GameBoardLocationComponent {

  @Input()
  location!: Location;

  artLocation = 'assets/card-images/fusion-falls.png'

  @Output()
  locationClicked = new EventEmitter<string>();

  onActionButtonClicked() {
    this.locationClicked.emit(this.location.name);
  }
}