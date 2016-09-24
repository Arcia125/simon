var style = require('./main.scss');
var html = require('./index.html');


var canvas;
var ctx;
var innerR;
var outerR;
var rects;
var buttonList = [];
var startButton = document.getElementById('start');
var strictButton = document.getElementById('strict');
var topLeft, topRight, bottomLeft, bottomRight;
var outerCircle, innerCircle;
var game;

function init() {
  canvas = document.getElementById('game-canvas');
  if (canvas.getContext) {
    ctx = canvas.getContext('2d');
    window.addEventListener('resize', resizeCanvas, false);
    window.addEventListener('orientationchange', resizeCanvas, false);
    startButton.addEventListener('click', startClick);
    strictButton.addEventListener('click', strictClick);
    resizeCanvas();
    makeRects();
    makeButtons();
    makeCircles();
    game = new Game(false);
  }
}

function toRads(degrees) {
  return (Math.PI / 180) * degrees;
}

function pctMeas(pct, measurement) {
  return Math.floor(measurement * (pct * 0.01));
}

function makeRects() {
  rects = {
    "topLeft": {
      "x": pctMeas(50, canvas.width) - outerR,
      "y": pctMeas(50, canvas.height) - outerR,
      "x2": pctMeas(50, canvas.width),
      "y2": pctMeas(50, canvas.height)
    },
    "topRight": {
      "x": pctMeas(50, canvas.width),
      "y": pctMeas(50, canvas.height) - outerR,
      "x2": pctMeas(50, canvas.width) + outerR,
      "y2": pctMeas(50, canvas.height)
    },
    "bottomLeft": {
      "x": pctMeas(50, canvas.width) - outerR,
      "y": pctMeas(50, canvas.height),
      "x2": pctMeas(50, canvas.width),
      "y2": pctMeas(50, canvas.height) + outerR
    },
    "bottomRight": {
      "x": pctMeas(50, canvas.width),
      "y": pctMeas(50, canvas.height),
      "x2": pctMeas(50, canvas.width) + outerR,
      "y2": pctMeas(50, canvas.height) + outerR
    }
  };
}

function makeButtons() {
  var sound1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
  var sound2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
  var sound3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
  var sound4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
  topLeft = new SimonButton('topLeft', 'rgba(0, 167, 74, 1)', -outerR, 0, 180, 270, 270, 180, rects.topLeft, sound1);
  topRight = new SimonButton('topRight', 'rgba(159, 15, 23, 1)', 0, -outerR, 270, 360, 360, 270, rects.topRight, sound2);
  bottomLeft = new SimonButton('bottomLeft', 'rgba(204, 167, 7, 1)', 0, outerR, 90, 180, 180, 90, rects.bottomLeft, sound3);
  bottomRight = new SimonButton('bottomRight', 'rgba(9, 74, 143, 1)', outerR, 0, 0, 90, 90, 0, rects.bottomRight, sound4);

}

function makeCircles() {
  outerCircle = new Circle(outerR, false);
  innerCircle = new Circle(innerR, 'rgb(255, 255, 255)');
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // radius of outer circle
  outerR = pctMeas(19, canvas.width);
  // radius of inner circle
  innerR = pctMeas(12, canvas.width);

  var buttonHeight = pctMeas(50, innerR);
  var buttonWidth = pctMeas(50, innerR);
  var buttonFont = pctMeas(33, buttonHeight);
  var buttonBorder = pctMeas(6, buttonHeight);

  var startTop = pctMeas(50, canvas.height) - pctMeas(50, buttonHeight);
  var startLeft = pctMeas(50, canvas.width) - pctMeas(50, buttonWidth) - pctMeas(40, innerR);

  var strictTop = pctMeas(50, canvas.height) - pctMeas(50, buttonHeight);
  var strictLeft = pctMeas(50, canvas.width) - pctMeas(50, buttonWidth) + pctMeas(45, innerR);

  startButton.style.top = startTop.toString() + 'px';
  startButton.style.left = startLeft.toString() + 'px';
  startButton.style.height = buttonHeight.toString() + 'px';
  startButton.style.width = buttonWidth.toString() + 'px';
  startButton.style.fontSize = buttonFont + 'px';
  startButton.style.borderWidth = buttonBorder + 'px';

  strictButton.style.top = strictTop.toString() + 'px';
  strictButton.style.left = strictLeft.toString() + 'px';
  strictButton.style.height = buttonHeight.toString() + 'px';
  strictButton.style.width = buttonWidth.toString() + 'px';
  strictButton.style.fontSize = buttonFont + 'px';
  strictButton.style.borderWidth = buttonBorder + 'px';

  if (typeof topLeft !== 'undefined') {
    topLeft.x = -outerR;
    topRight.y = -outerR;
    bottomLeft.y = outerR;
    bottomRight.x = outerR;
  }

  if (typeof outerCircle !== 'undefined') {
    outerCircle.radius = outerR;
  }
  if (typeof innerCircle !== 'undefined') {
    innerCircle.radius = innerR;
  }
  if (typeof rects !== 'undefined') {
    resizeRects();
  }

  if (buttonList.length > 0) {
    var button;
    var buttonName;
    for (var bID in buttonList) {
      button = buttonList[bID];
      buttonName = button.name;
      button.rect = rects[buttonName];
    }
  }

}

function resizeRects() {
  rects.topLeft = {
    "x": pctMeas(50, canvas.width) - outerR,
    "y": pctMeas(50, canvas.height) - outerR,
    "x2": pctMeas(50, canvas.width),
    "y2": pctMeas(50, canvas.height)
  };
  rects.topRight = {
    "x": pctMeas(50, canvas.width),
    "y": pctMeas(50, canvas.height) - outerR,
    "x2": pctMeas(50, canvas.width) + outerR,
    "y2": pctMeas(50, canvas.height)
  };
  rects.bottomLeft = {
    "x": pctMeas(50, canvas.width) - outerR,
    "y": pctMeas(50, canvas.height),
    "x2": pctMeas(50, canvas.width),
    "y2": pctMeas(50, canvas.height) + outerR
  };
  rects.bottomRight = {
    "x": pctMeas(50, canvas.width),
    "y": pctMeas(50, canvas.height),
    "x2": pctMeas(50, canvas.width) + outerR,
    "y2": pctMeas(50, canvas.height) + outerR
  };
}

var SimonButton = function(name, color, x, y, startAngle1, endAngle1, startAngle2, endAngle2, rect, sound) {
  this.name = name;
  this.color = color;
  this.origColor = color;
  this.x = x;
  this.y = y;
  this.startAngle1 = startAngle1;
  this.endAngle1 = endAngle1;
  this.startAngle2 = startAngle2;
  this.endAngle2 = endAngle2;
  this.rect = rect;
  this.sound = sound;
  buttonList.push(this);
};

SimonButton.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.moveTo(this.x, this.y);
  ctx.arc(0, 0, innerR, toRads(this.startAngle1), toRads(this.endAngle1));
  ctx.arc(0, 0, outerR, toRads(this.startAngle2), toRads(this.endAngle2), true);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
};

SimonButton.prototype.detectCollision = function(mouseX, mouseY) {
  if (((mouseX > this.rect.x && mouseX < this.rect.x2) && (mouseY > this.rect.y && mouseY < this.rect.y2)) && (mouseX)) {
    return true;
  } else {
    return false;
  }
};

SimonButton.prototype.press = function() {
  this.lightUp();
};

SimonButton.prototype.lightUp = function() {
  this.sound.currentTime = 0;
  this.sound.play();
  this.color = this.color.replace('1)', '.7)');
  var thisButton = this;
  clearTimeout();
  setTimeout(function() {
    thisButton.color = thisButton.origColor;
  }, 150);
};

SimonButton.prototype.warningFlash = function() {
  var thisButton = this;
  thisButton.color = 'rgba(255, 30, 40, 1)';
  setTimeout(function() {
    thisButton.color = thisButton.origColor;
  }, 300);
};

var Circle = function(radius, fill) {
  this.radius = radius;
  this.fill = fill;
};

Circle.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(0, 0, this.radius, 0, toRads(360));
  if (this.fill) {
    ctx.fillStyle = this.fill;
    ctx.fill();
  }
  ctx.stroke();
  ctx.closePath();
};

Circle.prototype.detectCollision = function(mouseX, mouseY) {
  var centerX = pctMeas(50, canvas.width);
  var centerY = pctMeas(50, canvas.height);
  var dx = Math.abs(mouseX - centerX);
  var dy = Math.abs(mouseY - centerY);
  return Math.pow(dx, 2) + Math.pow(dy, 2) <= Math.pow(this.radius, 2);
};

var Game = function(strictMode) {
  this.strictMode = strictMode;
  this.level = 1;
  this.pattern = [];
  this.playerMoveNumber = 0;
  this.delay = 400;
  this.win = false;
};

Game.prototype.resetGame = function() {
  this.level = 1;
  this.pattern = [];
  this.playerMoveNumber = 0;
  this.win = false;
};

Game.prototype.generatePattern = function() {
  var randomIndex;
  for (var i = 0; i < 20; i++) {
    randomIndex = Math.floor(Math.random() * 4);
    this.pattern.push(buttonList[randomIndex]);
  }
};

Game.prototype.getMove = function(moveNumber) {
  return this.pattern[moveNumber];
};

Game.prototype.getLevelMoves = function() {
  var moveList = [];
  for (var i = 0; i < this.level; i++) {
    moveList.push(this.getMove(i));
  }
  return moveList;
};

Game.prototype.displayLevel = function() {
  var moveList = this.getLevelMoves();
  var thisGame = this;
  moveList.forEach(function(move, moveNumber) {
    setTimeout(function() {
      move.lightUp();
    }, (moveNumber + 1) * thisGame.delay);
  });
};

Game.prototype.draw = function() {
  ctx.beginPath();
  var gameText;
  if (this.level < 10) {
    gameText = '0' + this.level;
  } else {
    gameText = this.level;
  }
  ctx.font = responsiveFont(50, 'Rationale');
  ctx.fillStyle = '#A00';
  ctx.fillText(gameText, 0, innerR / 2);
};

Game.prototype.toString = function() {
  var patternString = '';
  this.pattern.forEach(function(i) {
    patternString += i.name;
    patternString += ' ';
  });
  return 'strict mode:' + this.strictMode + '\nlevel:' + this.level + '|player move number:' + this.playerMoveNumber + '\npattern:' + patternString;
};

function drawSimon() {
  ctx.fillStyle = '#777';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  if (game.strictMode == true) {
    strictButton.style.background = '#FF2222'
    var glow = '0px 0px ' + pctMeas(20, innerR) + 'px' + ' #FF2222';
    strictButton.style.boxShadow = glow;
  } else {
    strictButton.style.background = '#333333';
    strictButton.style.boxShadow = 'none';
  }
  ctx.save();

  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.translate(pctMeas(50, canvas.width), pctMeas(50, canvas.height));
  ctx.lineWidth = pctMeas(5, outerR);
  //circles
  outerCircle.draw();
  innerCircle.draw();
  // logo
  ctx.beginPath();

  ctx.fillStyle = '#000';

  ctx.font = responsiveFont(60, 'Ultra');
  ctx.textAlign = 'center';
  ctx.fillText('Simon', 0, pctMeas(45, -innerR));
  ctx.fillRect(pctMeas(15, -innerR), pctMeas(28, innerR), pctMeas(30, innerR), pctMeas(30, innerR));

  ctx.closePath();
  game.draw();
  // buttons
  for (var bID in buttonList) {
    buttonList[bID].draw();
  }
  if (game.win == true) {
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.font = responsiveFont(70, 'Ultra');
    ctx.textAlign = 'center';
    ctx.fillText('You win!', 0, pctMeas(105, -outerR));
    ctx.closePath();
  }
  ctx.restore();
}

function responsiveFont(sizePx, fontFamily) {
  var ratio = sizePx / 1523;
  var fontSize = canvas.width * ratio;
  return fontSize + 'px ' + fontFamily;
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSimon();
  window.requestAnimationFrame(draw);
}

function detectCollision(mouseX, mouseY) {
  if (outerCircle.detectCollision(mouseX, mouseY)) {
    if (!innerCircle.detectCollision(mouseX, mouseY)) {
      for (var i in buttonList) {
        if (buttonList[i].detectCollision(mouseX, mouseY)) {
          return buttonList[i];
        }
      }
    }
  }
}

function startClick() {
  startGame();
}

function strictClick() {
  game.strictMode = game.strictMode ? false : true;
}

function startGame() {
  game.resetGame();
  game.generatePattern();
  game.displayLevel();
  waitForPlayer();
}

function nextLevel() {
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

function waitForPlayer() {
  if (game.playerMoveNumber >= game.level) {
    setTimeout(nextLevel, 200);
  } else {
    canvas.addEventListener('click', clickHandler);
  }
}

function clickHandler(e) {
  var buttonClicked = detectCollision(e.offsetX, e.offsetY);
  if (typeof buttonClicked !== 'undefined') {
    canvas.removeEventListener('click', clickHandler);
    playerSelection(buttonClicked);
  }
}

function playerSelection(selection) {
  if (selection.name === game.getMove(game.playerMoveNumber).name) {
    selection.press();
    game.playerMoveNumber++;
    waitForPlayer();
  } else {
    for (var bID in buttonList) {
      buttonList[bID].warningFlash();
    }
    setTimeout(function() {
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

function test() {
  console.log("caller is " + arguments.callee.caller.toString());
}

init();
draw();