import { MoveScoutLocation } from '..';
import { Game } from '../game/game';

export type PlayerJoined = {
    readonly type: 'player-joined';
    readonly name: string;
    readonly room: string;
};

export type GameStarted = {
    readonly type: 'game-started';
    readonly room: string;
};

export type MoveRocketLocation = {
    readonly type: 'move-rocket-location';
    readonly room: string;
    readonly from: string;
    readonly to: string;
};

export type MoveScoutMessage = {
    readonly type: 'move-scout-message';
    readonly room: string;
    readonly to: string;
}

export type TurnCompleted = {
    readonly type: 'turn-completed';
    readonly room: string;
};

export type GoToLocation = {
    readonly type: 'go-to-location';
    readonly room: string;
    readonly location: string;
};

export type ActivatedCard = {
    readonly type: 'activated-card';
    readonly room: string;
    readonly card: number;
};

export type SendGameData = {
    readonly type: 'send-game-data';
    readonly room: string;
    readonly game: Game;
};

export type NetworkMessage
    = PlayerJoined
    | GameStarted
    | MoveRocketLocation
    | MoveScoutMessage
    | TurnCompleted
    | GoToLocation
    | ActivatedCard;

export const playerJoined = (room: string, name: string): PlayerJoined => ({room, name, type: 'player-joined'});
export const sendGameData = (room: string, game: Game): SendGameData => ({room, game, type: 'send-game-data'});
export const goToLocation = (room: string, location: string): GoToLocation => ({room, location, type: 'go-to-location'});
export const turnCompleted = (room: string): TurnCompleted => ({room, type: 'turn-completed'});
