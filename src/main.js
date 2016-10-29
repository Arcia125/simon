import './main.scss';
import './index.html';

import Game from './game';
import SimonButton from './simonButton';
import Circle from './circle';

import utilities from './utilities';

const initApp = function initApp() {
    const canvas = document.getElementById('game-canvas');
    let ctx;
    let innerR;
    let outerR;
    let rects;
    let buttonList = [];
    const startButton = document.getElementById('start');
    const strictButton = document.getElementById('strict');
    let topLeft, topRight, bottomLeft, bottomRight;
    let outerCircle, innerCircle;
    const game = new Game(false);
    const init = function init() {
        if (canvas.getContext) {
            ctx = canvas.getContext('2d');
            window.addEventListener('resize', resizeCanvas, false);
            window.addEventListener('orientationchange', resizeCanvas, false);
            startButton.addEventListener('click', startGame);
            strictButton.addEventListener('click', strictClick);
            resizeCanvas();
            makeRects();
            buttonList = makeButtons();
            makeCircles();
            draw();
        }
    }

    const makeRects = () => {
        rects = {
            "topLeft": {
                "x": utilities.pctMeasure(50, canvas.width) - outerR,
                "y": utilities.pctMeasure(50, canvas.height) - outerR,
                "x2": utilities.pctMeasure(50, canvas.width),
                "y2": utilities.pctMeasure(50, canvas.height)
            },
            "topRight": {
                "x": utilities.pctMeasure(50, canvas.width),
                "y": utilities.pctMeasure(50, canvas.height) - outerR,
                "x2": utilities.pctMeasure(50, canvas.width) + outerR,
                "y2": utilities.pctMeasure(50, canvas.height)
            },
            "bottomLeft": {
                "x": utilities.pctMeasure(50, canvas.width) - outerR,
                "y": utilities.pctMeasure(50, canvas.height),
                "x2": utilities.pctMeasure(50, canvas.width),
                "y2": utilities.pctMeasure(50, canvas.height) + outerR
            },
            "bottomRight": {
                "x": utilities.pctMeasure(50, canvas.width),
                "y": utilities.pctMeasure(50, canvas.height),
                "x2": utilities.pctMeasure(50, canvas.width) + outerR,
                "y2": utilities.pctMeasure(50, canvas.height) + outerR
            }
        };
    }

    const makeButtons = () => {
        const sound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
        const sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
        const sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
        const sound4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
        topLeft = new SimonButton('topLeft', 'hsl(147, 100%, 33%)', -outerR, 0, 180, 270, 270, 180, rects.topLeft, sound1);
        topRight = new SimonButton('topRight', 'hsl(357, 83%, 34%)', 0, -outerR, 270, 360, 360, 270, rects.topRight, sound2);
        bottomLeft = new SimonButton('bottomLeft', 'hsl(211, 88%, 30%)', 0, outerR, 90, 180, 180, 90, rects.bottomLeft, sound3);
        bottomRight = new SimonButton('bottomRight', 'hsl(49, 93%, 41%)', outerR, 0, 0, 90, 90, 0, rects.bottomRight, sound4);
        return [topLeft, topRight, bottomLeft, bottomRight];

    }

    const makeCircles = () => {
        outerCircle = new Circle(outerR, false);
        innerCircle = new Circle(innerR, 'rgb(255, 255, 255)');
    }

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // radius of outer circle
        outerR = utilities.pctMeasure(20, canvas.width);
        // radius of inner circle
        innerR = utilities.pctMeasure(13, canvas.width);

        const buttonHeight = utilities.pctMeasure(50, innerR);
        const buttonWidth = utilities.pctMeasure(50, innerR);
        const buttonFont = utilities.pctMeasure(33, buttonHeight);
        const buttonBorder = utilities.pctMeasure(6, buttonHeight);

        const startTop = utilities.pctMeasure(50, canvas.height);
        const startLeft = utilities.pctMeasure(50, canvas.width) - utilities.pctMeasure(40, innerR);

        const strictTop = utilities.pctMeasure(50, canvas.height);
        const strictLeft = utilities.pctMeasure(50, canvas.width) + utilities.pctMeasure(45, innerR);

        startButton.style.top = `${startTop}px`;
        startButton.style.left = `${startLeft}px`;
        startButton.style.height = `${buttonHeight}px`;
        startButton.style.width = `${buttonWidth}px`;
        startButton.style.fontSize = `${buttonFont}px`;
        startButton.style.borderWidth = `${buttonBorder}px`;
        startButton.style.background = '#336633';

        strictButton.style.top = `${strictTop}px`;
        strictButton.style.left = `${strictLeft}px`
        strictButton.style.height = `${buttonHeight}px`;
        strictButton.style.width = `${buttonWidth}px`;
        strictButton.style.fontSize = `${buttonFont}px`;
        strictButton.style.borderWidth = `${buttonBorder}px`;
        strictButton.style.background = '#663333';

        if (topLeft) {
            topLeft.x = -outerR;
            topRight.y = -outerR;
            bottomLeft.y = outerR;
            bottomRight.x = outerR;
        }

        if (outerCircle) {
            outerCircle.radius = outerR;
        }
        if (innerCircle) {
            innerCircle.radius = innerR;
        }
        if (rects) {
            resizeRects();
        }

        if (buttonList.length > 0) {
            buttonList.forEach(button => button.rect = rects[button.name])
        }

    }

    const resizeRects = function resizeRects() {
        rects.topLeft = {
            "x": utilities.pctMeasure(50, canvas.width) - outerR,
            "y": utilities.pctMeasure(50, canvas.height) - outerR,
            "x2": utilities.pctMeasure(50, canvas.width),
            "y2": utilities.pctMeasure(50, canvas.height)
        };
        rects.topRight = {
            "x": utilities.pctMeasure(50, canvas.width),
            "y": utilities.pctMeasure(50, canvas.height) - outerR,
            "x2": utilities.pctMeasure(50, canvas.width) + outerR,
            "y2": utilities.pctMeasure(50, canvas.height)
        };
        rects.bottomLeft = {
            "x": utilities.pctMeasure(50, canvas.width) - outerR,
            "y": utilities.pctMeasure(50, canvas.height),
            "x2": utilities.pctMeasure(50, canvas.width),
            "y2": utilities.pctMeasure(50, canvas.height) + outerR
        };
        rects.bottomRight = {
            "x": utilities.pctMeasure(50, canvas.width),
            "y": utilities.pctMeasure(50, canvas.height),
            "x2": utilities.pctMeasure(50, canvas.width) + outerR,
            "y2": utilities.pctMeasure(50, canvas.height) + outerR
        };
    }

    const drawSimon = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let grd = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, outerR, canvas.width / 2, canvas.height / 2, canvas.height * 1.5);
        grd.addColorStop(0, '#222');
        grd.addColorStop(1, '#000');
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.save();

        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.translate(utilities.pctMeasure(50, canvas.width), utilities.pctMeasure(50, canvas.height));
        ctx.lineWidth = utilities.pctMeasure(5, outerR);

        // Draw the button circle and the inner face of the game.
        outerCircle.draw(ctx);
        innerCircle.draw(ctx);


        drawLogo();

        drawLevelDisplay();

        // buttons
        buttonList.forEach(button => button.draw(ctx, innerR, outerR));
        if (game.win) {
            drawText({
                text: 'You Win!',
                x: 0,
                y: utilities.pctMeasure(105, -outerR),
                ctx,
                font: utilities.responsiveFont(70, 'Ultra', canvas.width),
                textAlign: 'center',
            });
        }
        ctx.restore();
    }

    const drawLogo = () => {
        drawText({
            text: 'Simon®',
            x: 0,
            y: utilities.pctMeasure(45, -innerR),
            ctx,
            font: utilities.responsiveFont(55, 'Ultra', canvas.width),
            textAlign: 'center',
        });
    }

    const drawLevelDisplay = () => {
        ctx.beginPath();
        ctx.fillRect(utilities.pctMeasure(15, -innerR), utilities.pctMeasure(28, innerR), utilities.pctMeasure(30, innerR), utilities.pctMeasure(30, innerR));
        ctx.closePath();
        drawText({
            text: game.level < 10 ? `0${game.level}` : game.level,
            x: 0,
            y: utilities.pctMeasure(53, innerR),
            fill: '#AA0000',
            ctx,
            font: utilities.responsiveFont(50, 'Rationale', canvas.width),
            textAlign: 'center',
        });
    }

    const drawText = ({ text, x = 0, y = 0, fill = '#000', ctx, font, textAlign = 'start' } = {}) => {
        ctx.beginPath();
        ctx.fillStyle = fill;
        ctx.font = font;
        ctx.textAlign = textAlign;
        ctx.fillText(text, x, y);
        ctx.closePath();
    }
    const draw = () => {
        drawSimon();
        window.requestAnimationFrame(draw);
    }


    const detectCollision = (mouseX, mouseY) => {
        if (outerCircle.detectCollision(mouseX, mouseY, canvas.width, canvas.height)) {
            if (!innerCircle.detectCollision(mouseX, mouseY, canvas.width, canvas.height)) {
                return buttonList.find(button => button.detectCollision(mouseX, mouseY));
            }
        }
    }

    const strictClick = () => {
        game.strictMode = !game.strictMode;
        if (game.strictMode) {
            strictButton.style.background = '#FF2222'
            strictButton.style.boxShadow = `0px 0px ${utilities.pctMeasure(30, innerR)}px #FF2222`;
        } else {
            strictButton.style.background = '#663333';
            strictButton.style.boxShadow = 'none';
        }
    }

    const startGame = () => {
        startButton.style.background = '#00FF33';
        startButton.style.boxShadow = `0px 0px ${utilities.pctMeasure(30, innerR)}px #00FF33`;
        game.resetGame();
        game.generatePattern(buttonList);
        game.displayLevel();
        waitForPlayer();
    }

    const nextLevel = () => {
        if (game.level >= 20) {
            game.win = true;
            setTimeout(function() {
                startGame();
            }, 3000);
        } else {
            game.level++;
            game.playerMoveNumber = 0;
            game.displayLevel();
            waitForPlayer();
        }
    }

    const waitForPlayer = () => {
        if (game.playerMoveNumber >= game.level) {
            setTimeout(nextLevel, 200);
        } else {
            canvas.addEventListener('click', clickHandler);
        }
    }

    const clickHandler = function clickHandler(e) {
        let buttonClicked = detectCollision(e.offsetX, e.offsetY);
        if (buttonClicked) {
            canvas.removeEventListener('click', clickHandler);
            playerSelection(buttonClicked);
        }
    }

    const playerSelection = (selection) => {
        if (game.selectionIsCorrect(selection.name)) {
            selection.press();
            game.playerMoveNumber++;
            waitForPlayer();
        } else {
            buttonList.forEach(button => button.warningFlash());
            setTimeout(() => {
                if (game.strictMode) {
                    startGame();
                } else {
                    game.displayLevel();
                    game.playerMoveNumber = 0;
                    waitForPlayer();
                }
            }, 400);
        }
    }



    init();
    document.removeEventListener('DOMContentLoaded', initApp);
}

document.addEventListener('DOMContentLoaded', initApp);
