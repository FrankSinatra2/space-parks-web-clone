import { isMoonCrystal, isSeaCrystal, Resource } from '..';
import { GainResource, SpendResource, DrawCard, MoveScoutLocation, gainResource, spendResource, gainController, moveScoutLocation, GainController, drawCard, DrawCardChoice, activateCard, ActivateCard } from '../engine/action'
import { Player } from './player';
import { sunCrystal, moonCrystal, seaCrystal, isSunCrystal, experiencePoint, fastTravelPass } from './resource';

export type LocationAction
  = GainResource
  | SpendResource
  | DrawCard
  | MoveScoutLocation
  | GainController
  | DrawCard
  | ActivateCard;

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

export const doubleFusionFalls = (): Location => ({
  guard: (x: Player) => x.resources.some(isSeaCrystal) && x.resources.some(isMoonCrystal),
  action: [
    spendResource(seaCrystal, 1),
    spendResource(moonCrystal, 1),
    gainResource(experiencePoint, 3)
  ],
  name: 'Double Fusion Falls',
  actionText: 'Gain EX for a sea&moon Crystal',
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

export const outpostThirteen = (choiceGetter: () => number): Location => ({
  guard: (x: Player) => {
    const card = x.cards[choiceGetter()];
    const crystalCountMap = (acc: Record<string, number>, x: Resource): Record<string, number> => {
      if (!acc[x.type]) {
        acc[x.type] = 0;
      }
      acc[x.type]++;
      return acc;
    };

    const playerMap = x.resources.reduce(crystalCountMap, {});
    const required = card.cost.reduce(crystalCountMap, {});

    return ![
      'sun-crystal',
      'moon-crystal',
      'sea-crystal'
    ].some(x => playerMap[x] < required[x]);
  },
  action: [
    activateCard(choiceGetter)
  ],
  name: 'Outpost 13',
  actionText: 'Activate a Badge',
  activeLocation: false,
  activeScout: false
});


