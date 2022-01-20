import { Crystal, ExperiencePoint } from "./resource";
import { StatusEffect } from "./status-effect";

export type CardType = 'lunar' | 'celestial' | 'cosmic' | 'forbidden'; 

export type Card = {
  readonly cost: Crystal[];
  readonly ability: StatusEffect[];
  readonly type: CardType;
  readonly expReward: ExperiencePoint[];
};
