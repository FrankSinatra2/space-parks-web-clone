import { Resource } from './resource';
import { Card } from './card';

export type Player = {
  name: string;
  resources: Resource[];
  cards: Card[];
};

