import { astralArcade, celestialSeas, cosmicCanyon, fusionFalls, Game, lunarWoods, outpostThirteen, Player, starlightStation, sunCrystal, Location, DrawCardChoice, Card, experiencePoint, seaCrystal, doubleFusionFalls } from 'space-parks-engine';


export const createGame = (locationGetter: () => Location, drawChoiceGetter: () => DrawCardChoice, activateCardGetter: () => number): Game => {
    const locs: Location[] = [
        (() => { const cc = cosmicCanyon(); cc.activeLocation = true; return cc; })(),
        (() => { const cc = lunarWoods(); cc.activeLocation = true; return cc; })(),
        (() => { const cc = celestialSeas(); cc.activeLocation = true; return cc; })(),
        fusionFalls(),
        (() => { const cc = lunarWoods(); return { ...cc, name: 'Lunar Woods Two' }; })(),
        (() => { const cc = celestialSeas(); return { ...cc, name: 'Celestial Seas Two' }; })(),
        doubleFusionFalls()
        // outpostThirteen(activateCardGetter),
        // astralArcade(locationGetter)
      ];
      locs.sort(() => Math.random() - 0.5);
    //   locs.unshift(starlightStation(drawChoiceGetter));
  
      const players: Player[] = [
        
      ];

      const cards: Card[] = [
        {
            type: 'celestial',
            ability: [],
            expReward: [experiencePoint(), experiencePoint()],
            cost: [sunCrystal(), seaCrystal()]
        },
        {
            type: 'celestial',
            ability: [],
            expReward: [experiencePoint(), experiencePoint()],
            cost: [sunCrystal(), seaCrystal()]
        },
        {
            type: 'celestial',
            ability: [],
            expReward: [experiencePoint(), experiencePoint()],
            cost: [sunCrystal(), seaCrystal()]
        },
        {
            type: 'celestial',
            ability: [],
            expReward: [experiencePoint(), experiencePoint()],
            cost: [sunCrystal(), seaCrystal()]
        },
        {
            type: 'celestial',
            ability: [],
            expReward: [experiencePoint(), experiencePoint()],
            cost: [sunCrystal(), seaCrystal()]
        },
        {
            type: 'celestial',
            ability: [],
            expReward: [experiencePoint(), experiencePoint()],
            cost: [sunCrystal(), seaCrystal()]
        }
      ];
  
      return {
        currentPlayer: 0,
        controllerOwner: -1,
        locations: locs,
        players: players,
        revealedCards: [],
        deck: []
      }
};
