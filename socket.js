export default class ServerConnection {
    constructor(game) {
        this.game = game;
        this.url = 'ws://localhost:9090';
        this.connected = false;
        this.socket = new WebSocket(this.url);
        this.handShake();
        this.gameStateListener();
        this.disconnectListener();
    }
    sendInput(input, action) {
        const data = JSON.stringify({
            inputData: [this.game.userType, input, action]
        });
        this.socket.send(data);
    }
    handShake() {
        this.socket.addEventListener('open', () => {
            this.socket.send(JSON.stringify({
                userType: this.game.userType,
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
            if ('opponentConnected' in parsedData) {
                this.game.opponentConnected = true;
            }
            if ('opponentDisconnected' in parsedData) {
                this.game.opponentConnected = false;
            }
        })
    }
    disconnectListener() {
        this.socket.addEventListener('close', (event) => {
            this.connected = false;
        })
    }
}