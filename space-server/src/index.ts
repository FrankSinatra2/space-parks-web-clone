import { createServer } from 'http';
import { Server } from 'socket.io';
import { activateCard, ActivateCard, ActivatedCard, advanceRocketLocation, advanceTurns, DrawCardChoice, Game, Location, MoveScoutLocation, MoveScoutMessage, processAdvanceRocketLocation, processAdvanceTurns, sunCrystal, visitLocation } from 'space-parks-engine';
import { createGame } from './game';
import { GameStarted, GoToLocation, MoveRocketLocation, PlayerJoined, sendGameData, TurnCompleted } from 'space-parks-engine';



const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: true
  }
});

const games: Record<string, Game> = {};

io.on('connection', (socket) => {

  let scoutDestination: Location;
  const locationGetter = (): Location => {
    return scoutDestination;
  };

  let currentCardChoice: DrawCardChoice;
  const drawChoiceGetter = (): DrawCardChoice => {
    return currentCardChoice;
  }

  let currentActivateChoice: number;
  const activateChoiceGetter = (): number => {
    return currentActivateChoice;
  }

  socket.on('player-joined', (event: PlayerJoined) => {
    socket.join(event.room);

    if (!games[event.room]) {
      games[event.room] = createGame(locationGetter, drawChoiceGetter, activateChoiceGetter);
    }

    games[event.room].players.push({
      name: event.name,
      resources: [ sunCrystal() ],
      cards: []
    })

    const gameMessage = sendGameData(event.room, games[event.room]);
    socket.to(event.room).emit('send-game-data', gameMessage);
    socket.emit('send-game-data', gameMessage);
  });

  socket.on('game-started', (event: GameStarted) => {
    // not needed
  });

  socket.on('move-rocket-location', (event: MoveRocketLocation) => {
    const from = games[event.room].locations.find(x => x.name === event.from)!;
    const to = games[event.room].locations.find(x => x.name === event.to)!;
    console.log(games[event.room]);
    const action = advanceRocketLocation(to, from);
    console.log(action);

    games[event.room] = processAdvanceRocketLocation(games[event.room], action);

    const gameMessage = sendGameData(event.room, games[event.room]);
    socket.to(event.room).emit('send-game-data', gameMessage);
    socket.emit('send-game-data', gameMessage);
  });

  socket.on('turn-completed', (event: TurnCompleted) => {
    const action = advanceTurns();
    games[event.room] = processAdvanceTurns(games[event.room], action);

    const gameMessage = sendGameData(event.room, games[event.room]);
    socket.to(event.room).emit('send-game-data', gameMessage);
    socket.emit('send-game-data', gameMessage);
  });

  socket.on('go-to-location', (event: GoToLocation) => {
    const location = games[event.room].locations.findIndex(x => x.name === event.location);
    games[event.room] = visitLocation(games[event.room], location);

    const gameMessage = sendGameData(event.room, games[event.room]);
    socket.to(event.room).emit('send-game-data', gameMessage);
    socket.emit('send-game-data', gameMessage);
  });

  socket.on('activated-card', (event: ActivatedCard) => {
    currentActivateChoice = event.card;
  });

  socket.on('move-scout-message', (event: MoveScoutMessage) => {
    const location = games[event.room].locations.find(x => x.name === event.to)!;
    scoutDestination = location;
  });
});

httpServer.listen(3000);