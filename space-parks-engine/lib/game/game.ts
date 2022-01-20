import { Player } from './player';
import { Card } from './card';
import { Location } from './location';


export type WithId<T> = { id: string } & T;

export type Game = {
  players: Player[];
  deck: Card[];
  revealedCards: Card[];
  locations: Location[];
  
  currentPlayer: number;
  controllerOwner: number;
};


