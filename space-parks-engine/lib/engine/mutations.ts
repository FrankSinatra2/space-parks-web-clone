import { Game } from '../game/game'
import { GainResource, SpendResource, DrawCard, ActivateCard, AdvanceRocketLocation, MoveScoutLocation, GainController, RemoveController, AdvanceTurns } from './action'
import { range } from './util';
import { Resource } from '../game/resource';

export const processGainResource = (game: Game, action: GainResource): Game => {
  const newGame: Game = { ...game };

  range(action.quantity).forEach(() => {
    newGame.players[newGame.currentPlayer].resources.push(action.resource);
  });

  return newGame;
};

export const processSpendResource = (game: Game, action: SpendResource): Game => {
  const newGame: Game = { ...game };

  let count: number = action.quantity;

  newGame.players[newGame.currentPlayer].resources =
    newGame.players[newGame.currentPlayer].resources.reduce((acc, x) => {
      if (x.type === action.resource.type && count > 0) {
        count--;
      } else {
        acc.push(x);
      }

      return acc;
    }, [] as Resource[]);

  return newGame;
};

export const processDrawCard = (game: Game, action: DrawCard): Game => {
  const newGame: Game = { ...game };

  if (newGame.deck.length) {
    switch (action.choice()) {
      case 'deck':
        newGame.players[newGame.currentPlayer].cards.push(newGame.deck.shift()!!);
        break;

      case 'top':
        newGame.players[newGame.currentPlayer].cards.push(newGame.revealedCards[0]);
        newGame.revealedCards.splice(0, 1);
        newGame.revealedCards.push(newGame.deck.shift()!!);
        break;

      case 'middle':
        newGame.players[newGame.currentPlayer].cards.push(newGame.revealedCards[1]);
        newGame.revealedCards.splice(1, 1);
        newGame.revealedCards.push(newGame.deck.shift()!!);
        break;

      case 'bottom':
        newGame.players[newGame.currentPlayer].cards.push(newGame.revealedCards[2]);
        newGame.revealedCards.splice(2, 1);
        newGame.revealedCards.push(newGame.deck.shift()!!);
        break;
    };
  }

  return newGame;
};

export const processActivateCard = (game: Game, action: ActivateCard): Game => {
  const newGame: Game = { ...game };

  const card = newGame.players[newGame.currentPlayer].cards[action.choice()];
  newGame.players[newGame.currentPlayer].cards.splice(action.choice(), 1);
  newGame.players[newGame.currentPlayer].resources.push(...card.expReward);

  return newGame;
};

export const processAdvanceRocketLocation = (game: Game, action: AdvanceRocketLocation): Game => {
  const newGame: Game = { ...game };

  newGame.locations.forEach(element => {
    if (element.name === action.from.name) {
      element.activeLocation = false;
    }

    if (element.name === action.to.name) {
      element.activeLocation = true;
    }
  });

  return newGame;
};

export const processMoveScoutLocation = (game: Game, action: MoveScoutLocation): Game => {
  const newGame: Game = { ...game };

  newGame.locations.forEach(element => {
    element.activeScout = element.name === action.dest.name;
  });

  return newGame;
};

export const processGainController = (game: Game, action: GainController): Game => {
  const newGame: Game = { ...game };

  newGame.controllerOwner = newGame.currentPlayer;
  console.log('new-game');
  console.log(newGame);

  return newGame;
};

export const processRemoveController = (game: Game, action: RemoveController): Game => {
  const newGame: Game = { ...game };

  newGame.controllerOwner = -1;

  return newGame;
};

export const processAdvanceTurns = (game: Game, action: AdvanceTurns): Game => {
  const newGame: Game = { ...game };

  newGame.currentPlayer++;
  newGame.currentPlayer = newGame.currentPlayer % game.players.length;

  return newGame;
};