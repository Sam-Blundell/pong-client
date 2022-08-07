export default class ServerConnection {
    constructor(game) {
        this.game = game;
        this.connected = false;
        this.socket = new WebSocket(this.game.url);
        this.handShake();
        this.gameStateListener();
    }
    sendInput(input, action) {
        const data = JSON.stringify({
            inputData: [input, action]
        });
        this.socket.send(data);
    }
    handShake() {
        this.socket.addEventListener('open', () => {
            this.socket.send(JSON.stringify({
                initialState: this.game.gameState,
            }));
            this.connected = true;
        });
    }
    gameStateListener() {
        this.socket.addEventListener('message', (event) => {
            const parsedData = JSON.parse(event.data);
            if ('gameState' in parsedData) {
                this.game.gameState = parsedData.gameState;
            }
        })
    }
}