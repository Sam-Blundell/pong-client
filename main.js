import InputHandler from './inputHandler.js';
import ServerConnection from './socket.js'
import { Player, Opponent } from './paddle.js';

window.addEventListener('load', () => {
    const gameScreen = document.getElementById('GameScreen');
    const context = gameScreen.getContext('2d');
    gameScreen.height = 700;
    gameScreen.width = 500;

    class Game {
        constructor(height, width) {
            this.height = height;
            this.width = width;
            this.url = 'ws://localhost:9090';
            this.server = new ServerConnection(this);
            this.input = new InputHandler(this);
            this.player = new Player(this);
            this.opponent = new Opponent(this);
            this.gameState = {
                playerPos: this.player.xPos,
                opponentPos: this.opponent.xPos,
                ballXPos: 0,
                ballYPos: 0,
                ballHSpeed: 0,
                ballVSpeed: 1,
                score: 0,
            }
        }
        update(timeDelta) {
            if (this.server.connected) {
                this.server.socket.send(JSON.stringify({ updateState: true }));
            }
            const { playerPos, opponentPos} = this.gameState;
            this.player.update(playerPos);
            this.opponent.update(opponentPos);
        }
        draw(context) {
            this.player.draw(context);
            this.opponent.draw(context);
        }
    }

    const game = new Game(gameScreen.height, gameScreen.width);

    let lastTimeStamp = 0;
    const animate = (timeStamp) => {
        context.fillStyle = 'black';
        context.fillRect(0, 0, game.width, game.height);
        context.fillStyle = 'white';
        const timeDelta = timeStamp - lastTimeStamp;
        lastTimeStamp = timeStamp;
        game.update(timeDelta);
        game.draw(context);
        requestAnimationFrame(animate);
    }
    animate(0);

});