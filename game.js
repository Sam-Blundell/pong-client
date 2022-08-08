import InputHandler from './inputHandler.js';
import ServerConnection from './socket.js';
import { PlayerOnePaddle, PlayerTwoPaddle } from './paddle.js';

class Game {
    constructor(height, width) {
        this.screenHeight = height;
        this.screenWidth = width;
        this.opponentConnected = false;
        this.input = new InputHandler(this);
        this.playerOnePaddle = new PlayerOnePaddle(this);
        this.playerTwoPaddle = new PlayerTwoPaddle(this);
        this.gameState = {};
    }
    update(timeDelta) {
        if (this.server.connected === true && this.opponentConnected === true) {
            this.server.socket.send(JSON.stringify({ updateState: true }));
            const { playerOnePos, playerTwoPos} = this.gameState;
            this.playerOnePaddle.update(playerOnePos);
            this.playerTwoPaddle.update(playerTwoPos);
        }
    }
    draw(context) {
        this.playerOnePaddle.draw(context);
        this.playerTwoPaddle.draw(context);
    }
}

export class PlayerOne extends Game {
    constructor(height, width) {
        super(height, width);
        this.userType = 'playerOne';
        this.server = new ServerConnection(this)
    }
    update(timeDelta) {
        super.update(timeDelta);
    }
    draw(context) {
        super.draw(context);
    }
}

export class PlayerTwo extends Game {
    constructor(height, width) {
        super(height, width);
        this.userType = 'playerTwo';
        this.server = new ServerConnection(this);
    }
    update(timeDelta) {
        super.update(timeDelta);
    }
    draw(context) {
        super.draw(context);
    }
}