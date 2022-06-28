import { Component, Input } from "@angular/core";
import { Player, isSunCrystal, isMoonCrystal, isExperiencePoint, isFastTravelPass, isSeaCrystal } from 'space-parks-engine';


@Component({
  selector: 'player-card',
  templateUrl: './player-card.component.html',
  styleUrls: [
    './player-card.component.scss'
  ]
})
export class PlayerCardComponent {

  @Input()
  player!: Player;

  @Input()
  currentPlayer: boolean = false;

  @Input()
  currentController!: boolean;

  get sunCrystals(): number {
    return this.player.resources.filter(isSunCrystal).length; 
  }

  get seaCrystals(): number {
    return this.player.resources.filter(isSeaCrystal).length; 
  }

  get moonCrystals(): number {
    return this.player.resources.filter(isMoonCrystal).length; 
  }

  get fastTravel(): number {
    return this.player.resources.filter(isFastTravelPass).length;
  }

  get exp(): number {
    return this.player.resources.filter(isExperiencePoint).length;
  }
};