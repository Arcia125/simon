import utilities from './utilities';

class Game {
    constructor(isStrict) {
        this.isStrict = isStrict;
        this.level = 1;
        this.pattern = [];
        this.playerMoveNumber = 0;
        this.delay = 400;
        this.win = false;
    }

    resetGame() {
        this.level = 1;
        this.pattern = [];
        this.playerMoveNumber = 0;
        this.win = false;
    }

    selectionIsCorrect(selection) {
        return selection === this.pattern[this.playerMoveNumber].name;
    }

    generatePattern(buttonList) {
        for (let i = 0; i < 20; i++) {
            let randomIndex = Math.floor(Math.random() * 4);
            this.pattern.push(buttonList[randomIndex]);
        }
    }

    getLevelMoves() {
        return this.pattern.filter((move, ind) => ind < this.level);
    }

    displayLevel() {
        let moveList = this.getLevelMoves();
        moveList.forEach((move, moveNumber) => {
            setTimeout(() => {
                move.lightUp();
            }, (moveNumber + 1) * this.delay);
        });
    }
    draw(ctx, canvasWidth, innerR) {
        ctx.beginPath();
        const gameText = this.level < 10 ? `0${this.level}` : this.level;
        ctx.font = utilities.responsiveFont(50, 'Rationale', canvasWidth);
        ctx.fillStyle = '#AA0000';
        ctx.fillText(gameText, 0, innerR / 2);
    }
}

export default Game;
