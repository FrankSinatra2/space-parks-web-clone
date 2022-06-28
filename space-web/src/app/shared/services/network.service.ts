import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Game, NetworkMessage, playerJoined, SendGameData } from 'space-parks-engine';
import { failure, loading, notAsked, RemoteData, Success, success } from '../models/remote-data.model';

@Injectable({
    providedIn: 'root'
})
export class NetworkService {


    private readonly game = new BehaviorSubject<RemoteData<Game, any>>(notAsked());
    readonly game$ = this.game.asObservable()

    private roomCode: string = '';
    get room(): string {
        return this.roomCode;
    }

    constructor(
        private readonly socket: Socket
    ) {
        this.socket.fromEvent<SendGameData>('send-game-data')
            .pipe(
                tap((_: any) => this.game.next(loading())),
                map((x: SendGameData) => success(x.game)),
                catchError((x: any) => {
                    return of(failure(x));
                })
            ).subscribe((result) => {
                this.game.next(result);
            });
    }

    joinGame(username: string, room: string): void {

        this.roomCode = room;
        const message = playerJoined(room, username);
        this.socket.emit(message.type, message);
    }

    sendMessage(message: NetworkMessage): void {
        this.socket.emit(message.type, message);
    }
}

