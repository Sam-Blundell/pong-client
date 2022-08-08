import { PlayerOne, PlayerTwo } from './game.js';

window.addEventListener('load', () => {
    const player1Button = document.getElementById('Player1Button');
    const player2Button = document.getElementById('Player2Button');
    const gameScreen = document.getElementById('GameScreen');
    const context = gameScreen.getContext('2d');
    gameScreen.height = 700;
    gameScreen.width = 500;
    let game;

    let lastTimeStamp = 0;
    const animate = (timeStamp) => {
        context.fillStyle = 'black';
        context.fillRect(0, 0, game.screenWidth, game.screenHeight);
        context.fillStyle = 'white';
        const timeDelta = timeStamp - lastTimeStamp;
        lastTimeStamp = timeStamp;
        game.update(timeDelta);
        game.draw(context);
        requestAnimationFrame(animate);
    }

    const initGame = (user) => {
        if (user === 'playerOne') {
            game = new PlayerOne(gameScreen.height, gameScreen.width);
        } else if (user === 'playerTwo') {
            game = new PlayerTwo(gameScreen.height, gameScreen.width);
        }
        player1Button.remove();
        player2Button.remove();
        animate(0);
    }

    player1Button.onclick = () => {initGame('playerOne')};
    player2Button.onclick = () => {initGame('playerTwo')};
});
