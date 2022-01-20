import { GainResource, SpendResource, DrawCard, MoveScoutLocation, gainResource, spendResource, gainController, moveScoutLocation, GainController, drawCard, DrawCardChoice } from '../engine/action'
import { Player } from './player';
import { sunCrystal, moonCrystal, seaCrystal, isSunCrystal, experiencePoint, fastTravelPass } from './resource';

export type LocationAction
  = GainResource
  | SpendResource
  | DrawCard
  | MoveScoutLocation
  | GainController
  | DrawCard;

export type Location = {
  readonly guard: (x: Player) => boolean;
  readonly action: LocationAction[];

  readonly name: string;
  readonly actionText: string;
  
  activeLocation: boolean;
  activeScout: boolean;
};

export const cosmicCanyon = (): Location => ({
  guard: (_: Player) => true,
  action: [
    gainResource(sunCrystal, 2)
  ],
  name: 'Cosmic Canyon',
  actionText: 'Gain two Sun Crystals',
  activeLocation: false,
  activeScout: false
});

export const lunarWoods = (): Location => ({
  guard: (_: Player) => true,
  action: [
    gainResource(moonCrystal, 1)
  ],
  name: 'Lunar Woods',
  actionText: 'Gain one Moon Crystal',
  activeLocation: false,
  activeScout: false
});

export const celestialSeas = (): Location => ({
  guard: (_: Player) => true,
  action: [
    gainResource(seaCrystal, 1)
  ],
  name: 'Celestial Seas',
  actionText: 'Gain one Sea Crystal',
  activeLocation: false,
  activeScout: false
});

export const fusionFalls = (): Location => ({
  guard: (x: Player) => x.resources.some(isSunCrystal),
  action: [
    spendResource(sunCrystal, 1),
    gainResource(experiencePoint, 1)
  ],
  name: 'Fusion Falls',
  actionText: 'Trade for a Sun Crystal',
  activeLocation: false,
  activeScout: false,
});

export const astralArcade = (locationGetter: () => Location): Location => ({
  guard: (_: Player) => true,
  action: [
    gainResource(fastTravelPass, 1),
    gainController(),
    moveScoutLocation(locationGetter)
  ],
  name: 'Astral Arcade',
  actionText: 'Become the Controller',
  activeLocation: false,
  activeScout: false
});

export const starlightStation = (choiceGetter: () => DrawCardChoice): Location => ({
  guard: (_: Player) => true,
  action: [
    drawCard(choiceGetter)
  ],
  name: 'Starlight Station',
  actionText: 'Draw a Card',
  activeLocation: false,
  activeScout: false
});

export const outpostThirteen = (): Location => ({
  guard: (_: Player) => true,
  action: [
    
  ],
  name: 'Outpost 13',
  actionText: 'Activate a Badge',
  activeLocation: false,
  activeScout: false
});


