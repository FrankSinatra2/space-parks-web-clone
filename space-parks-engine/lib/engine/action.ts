import { Resource } from '../game/resource';
import { Location } from '../game/location';

export type DrawCardChoice = 'deck' | 'top' | 'middle' | 'bottom';

export type GainResource = {
  readonly type: 'gain-resource';
  readonly quantity: number;
  readonly resource: Resource;
};

export type SpendResource = {
  readonly type: 'spend-resource';
  readonly quantity: number;
  readonly resource: Resource;
};

export type DrawCard = {
  readonly type: 'draw-card';
  readonly choice: () => DrawCardChoice;
};

export type ActivateCard = {
  readonly type: 'activate-card';
  readonly choice: () => number;
}

export type AdvanceRocketLocation = {
  readonly type: 'advance-rocket-location';
  readonly from: Location;
  readonly to: Location;
};

export type MoveScoutLocation = {
  readonly type: 'move-scout-location';
  readonly dest: () => Location;
};

export type GainController = {
  readonly type: 'gain-controller';
};

export type RemoveController = {
  readonly type: 'remove-controller';
};

export type AskForOption = {
  readonly type: 'ask-for-option';
  readonly options: string[];
};

export type AdvanceTurns = {
  readonly type: 'advance-turns';
};

export type GameAction
  = GainResource
  | SpendResource
  | DrawCard
  | ActivateCard
  | AdvanceRocketLocation
  | MoveScoutLocation
  | GainController
  | RemoveController
  | AskForOption
  | AdvanceTurns;

export const gainResource = (resource: () => Resource, quantity: number): GainResource => ({
  resource: resource(),
  quantity: quantity,
  type: 'gain-resource'
});

export const spendResource = (resource: () => Resource, quantity: number): SpendResource => ({
  resource: resource(),
  quantity: quantity,
  type: 'spend-resource'
});

export const gainController = (): GainController => ({ type: 'gain-controller' });
export const moveScoutLocation = (dest: () => Location): MoveScoutLocation => ({ type: 'move-scout-location', dest });
export const drawCard = (choiceGetter: () => DrawCardChoice): DrawCard => ({ type: 'draw-card', choice: choiceGetter });
export const activateCard = (choice: () => number): ActivateCard => ({ type: 'activate-card', choice: choice });
export const advanceRocketLocation = (to: Location, from: Location): AdvanceRocketLocation => ({ type: 'advance-rocket-location', to, from });
export const advanceTurns = (): AdvanceTurns => ({ type: 'advance-turns' });
export const askForOption = (options: string[]): AskForOption => ({ type: 'ask-for-option', options })

export const isGainResource = (x: GameAction): x is GainResource => x.type === 'gain-resource';
export const isSpendResource = (x: GameAction): x is SpendResource => x.type === 'spend-resource';
export const isDrawCard = (x: GameAction): x is DrawCard => x.type === 'draw-card'
export const isActivateCard = (x: GameAction): x is ActivateCard => x.type === 'activate-card';
export const isAdvanceRocketLocation = (x: GameAction): x is AdvanceRocketLocation => x.type === 'advance-rocket-location';
export const isMoveScoutLocation = (x: GameAction): x is MoveScoutLocation => x.type === 'move-scout-location';
export const isGainController = (x: GameAction): x is GainController => x.type === 'gain-controller';
export const isRemoveController = (x: GameAction): x is RemoveController => x.type === 'remove-controller';
export const isAdvanceTurns = (x: GameAction): x is AdvanceTurns => x.type === 'advance-turns';
export const isAskForOption = (x: GameAction): x is AskForOption => x.type === 'ask-for-option';