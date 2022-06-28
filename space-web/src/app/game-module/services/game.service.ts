import { Injectable } from '@angular/core';
import { Game, cosmicCanyon, lunarWoods, celestialSeas, fusionFalls, outpostThirteen, astralArcade, starlightStation, DrawCardChoice, Location, Player, visitLocation, sunCrystal } from 'space-parks-engine';

@Injectable()
export class GameService {


  choice: DrawCardChoice = 'deck';
  choiceGetter = () => this.choice;

  locationGetter = () => this.game.locations[3];

  game: Game;

  constructor() {
    // const locs: Location[] = [
    //   (() => { const cc = cosmicCanyon(); cc.activeLocation = true; return cc; })(),
    //   (() => { const cc = lunarWoods(); cc.activeLocation = true; return cc; })(),
    //   (() => { const cc = celestialSeas(); cc.activeLocation = true; return cc; })(),
    //   fusionFalls(),
    //   outpostThirteen(),
    //   astralArcade(this.locationGetter)
    // ];
    // locs.sort(() => Math.random() - 0.5);
    // locs.unshift(starlightStation(this.choiceGetter));

    // const players: Player[] = [
    //   {
    //     name: 'Dakota',
    //     cards: [],
    //     resources: [sunCrystal()]
    //   },
    //   {
    //     name: 'Cole',
    //     cards: [],
    //     resources: [sunCrystal()]
    //   },
    //   {
    //     name: 'Osten',
    //     cards: [],
    //     resources: [sunCrystal()]
    //   },
     
    // ];

    // this.game = {
    //   currentPlayer: 0,
    //   controllerOwner: -1,
    //   locations: locs,
    //   players: players,
    //   revealedCards: [],
    //   deck: []
    // }
  }

  processVisitLocation(location: number) {
    this.game = visitLocation(this.game, location);
  }

}