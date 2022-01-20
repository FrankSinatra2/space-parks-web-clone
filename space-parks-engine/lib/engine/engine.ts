import { Game } from '../game/game';
import { isGainResource, isSpendResource, isDrawCard, advanceTurns, isActivateCard, isAdvanceRocketLocation, isMoveScoutLocation, isGainController, isRemoveController, isAdvanceTurns } from './action';
import { processGainResource, processSpendResource, processDrawCard, processAdvanceTurns, processActivateCard, processAdvanceRocketLocation, processMoveScoutLocation, processGainController, processRemoveController } from './mutations';


const actionProcessors: [any, any][] = [
  [isGainResource, processGainResource],
  [isSpendResource, processSpendResource],
  [isDrawCard, processDrawCard],
  [isActivateCard, processActivateCard],
  [isAdvanceRocketLocation, processAdvanceRocketLocation],
  [isMoveScoutLocation, processMoveScoutLocation],
  [isGainController, processGainController],
  [isRemoveController, processRemoveController]
];

export const visitLocation = (game: Game, locationChoice: number): Game => {

  const location = game.locations[locationChoice];
  const currentPlayer = game.players[game.currentPlayer];

  if (!location) {
    throw new Error(`Invalid location: ${locationChoice}`);
  }


  if (!location.guard(currentPlayer)) {
    throw new Error(`Player cannot preform location actions`);
  }

  if (!location.activeLocation) {
    throw new Error(`Player cannot go to an inactive location`);
  }

  let newGame: Game = { ...game };

  location.action.forEach((action) => {
    actionProcessors.forEach((pair) => {
      const [check, processor] = pair;
      
      if (check(action)) {
        console.log(action.type);
        newGame = processor(newGame, action);
      }
    })
  });

  newGame = processAdvanceTurns(newGame, advanceTurns());

  return newGame;
};

