class Paddle {
    constructor(game) {
        this.game = game;
        this.width = 60;
        this.height = 6;
        this.xPos = (this.game.width / 2) - (this.width / 2);
        this.yPos = this.game.height - 50;
        this.speed = 5;
    }
    update(serverPosition) {
        this.xPos = serverPosition;
    }
    draw(context) {
        context.fillRect(this.xPos, this.yPos, this.width, this.height);
    }
}

export class Player extends Paddle {
    constructor(game) {
        super(game);
        this.yPos = this.game.height - 50;
    }
    update(Position) {
        super.update(Position);
    }
    draw(context) {
        super.draw(context);
    }
}

export class Opponent extends Paddle {
    constructor(game) {
        super(game);
        this.yPos = 50;
    }
    update(statePosition) {
        super.update(statePosition);
    }
    draw(context) {
        super.draw(context);
    }
}