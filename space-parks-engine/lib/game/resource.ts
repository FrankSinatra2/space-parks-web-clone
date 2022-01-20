export type SunCrystal = {
  readonly type: 'sun-crystal';
};

export type SeaCrystal = {
  readonly type: 'sea-crystal';
};

export type MoonCrystal = {
  readonly type: 'moon-crystal';
};

export type FastTravelPass = {
  readonly type: 'fast-travel-pass';
};

export type ExperiencePoint = {
  readonly type: 'experience-point';
};

export type Crystal
  = SunCrystal
  | SeaCrystal
  | MoonCrystal;

export type Resource
  = Crystal
  | FastTravelPass
  | ExperiencePoint;

export const isSunCrystal = (x: Resource | Crystal): x is SunCrystal => x.type === 'sun-crystal';
export const isSeaCrystal = (x: Resource | Crystal): x is SeaCrystal => x.type === 'sea-crystal';
export const isMoonCrystal = (x: Resource | Crystal): x is MoonCrystal => x.type === 'moon-crystal';
export const isFastTravelPass = (x: Resource): x is FastTravelPass => x.type === 'fast-travel-pass';
export const isExperiencePoint = (x: Resource): x is ExperiencePoint => x.type === 'experience-point';

export const sunCrystal = (): SunCrystal => ({ type: 'sun-crystal' });
export const seaCrystal = (): SeaCrystal => ({ type: 'sea-crystal' });
export const moonCrystal = (): MoonCrystal => ({ type: 'moon-crystal' });
export const fastTravelPass = (): FastTravelPass => ({ type: 'fast-travel-pass' });
export const experiencePoint = (): ExperiencePoint => ({ type: 'experience-point' });
