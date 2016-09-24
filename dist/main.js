/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var style = __webpack_require__(1);
	var html = __webpack_require__(5);
	
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
	  return Math.PI / 180 * degrees;
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
	
	var SimonButton = function SimonButton(name, color, x, y, startAngle1, endAngle1, startAngle2, endAngle2, rect, sound) {
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
	
	SimonButton.prototype.draw = function () {
	  ctx.beginPath();
	  ctx.fillStyle = this.color;
	  ctx.moveTo(this.x, this.y);
	  ctx.arc(0, 0, innerR, toRads(this.startAngle1), toRads(this.endAngle1));
	  ctx.arc(0, 0, outerR, toRads(this.startAngle2), toRads(this.endAngle2), true);
	  ctx.stroke();
	  ctx.fill();
	  ctx.closePath();
	};
	
	SimonButton.prototype.detectCollision = function (mouseX, mouseY) {
	  if (mouseX > this.rect.x && mouseX < this.rect.x2 && mouseY > this.rect.y && mouseY < this.rect.y2 && mouseX) {
	    return true;
	  } else {
	    return false;
	  }
	};
	
	SimonButton.prototype.press = function () {
	  this.lightUp();
	};
	
	SimonButton.prototype.lightUp = function () {
	  this.sound.currentTime = 0;
	  this.sound.play();
	  this.color = this.color.replace('1)', '.7)');
	  var thisButton = this;
	  clearTimeout();
	  setTimeout(function () {
	    thisButton.color = thisButton.origColor;
	  }, 150);
	};
	
	SimonButton.prototype.warningFlash = function () {
	  var thisButton = this;
	  thisButton.color = 'rgba(255, 30, 40, 1)';
	  setTimeout(function () {
	    thisButton.color = thisButton.origColor;
	  }, 300);
	};
	
	var Circle = function Circle(radius, fill) {
	  this.radius = radius;
	  this.fill = fill;
	};
	
	Circle.prototype.draw = function () {
	  ctx.beginPath();
	  ctx.arc(0, 0, this.radius, 0, toRads(360));
	  if (this.fill) {
	    ctx.fillStyle = this.fill;
	    ctx.fill();
	  }
	  ctx.stroke();
	  ctx.closePath();
	};
	
	Circle.prototype.detectCollision = function (mouseX, mouseY) {
	  var centerX = pctMeas(50, canvas.width);
	  var centerY = pctMeas(50, canvas.height);
	  var dx = Math.abs(mouseX - centerX);
	  var dy = Math.abs(mouseY - centerY);
	  return Math.pow(dx, 2) + Math.pow(dy, 2) <= Math.pow(this.radius, 2);
	};
	
	var Game = function Game(strictMode) {
	  this.strictMode = strictMode;
	  this.level = 1;
	  this.pattern = [];
	  this.playerMoveNumber = 0;
	  this.delay = 400;
	  this.win = false;
	};
	
	Game.prototype.resetGame = function () {
	  this.level = 1;
	  this.pattern = [];
	  this.playerMoveNumber = 0;
	  this.win = false;
	};
	
	Game.prototype.generatePattern = function () {
	  var randomIndex;
	  for (var i = 0; i < 20; i++) {
	    randomIndex = Math.floor(Math.random() * 4);
	    this.pattern.push(buttonList[randomIndex]);
	  }
	};
	
	Game.prototype.getMove = function (moveNumber) {
	  return this.pattern[moveNumber];
	};
	
	Game.prototype.getLevelMoves = function () {
	  var moveList = [];
	  for (var i = 0; i < this.level; i++) {
	    moveList.push(this.getMove(i));
	  }
	  return moveList;
	};
	
	Game.prototype.displayLevel = function () {
	  var moveList = this.getLevelMoves();
	  var thisGame = this;
	  moveList.forEach(function (move, moveNumber) {
	    setTimeout(function () {
	      move.lightUp();
	    }, (moveNumber + 1) * thisGame.delay);
	  });
	};
	
	Game.prototype.draw = function () {
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
	
	Game.prototype.toString = function () {
	  var patternString = '';
	  this.pattern.forEach(function (i) {
	    patternString += i.name;
	    patternString += ' ';
	  });
	  return 'strict mode:' + this.strictMode + '\nlevel:' + this.level + '|player move number:' + this.playerMoveNumber + '\npattern:' + patternString;
	};
	
	function drawSimon() {
	  ctx.fillStyle = '#777';
	  ctx.fillRect(0, 0, canvas.width, canvas.height);
	  if (game.strictMode == true) {
	    strictButton.style.background = '#FF2222';
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
	    setTimeout(function () {
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
	    setTimeout(function () {
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/sass-loader/index.js?sourceMap!./main.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js?sourceMap!./../node_modules/sass-loader/index.js?sourceMap!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Ultra);", ""]);
	exports.push([module.id, "@import url(https://fonts.googleapis.com/css?family=Rationale);", ""]);
	
	// module
	exports.push([module.id, "body {\n  background: #777; }\n\n.start-button {\n  display: inline;\n  position: absolute;\n  background: lime;\n  padding: 0;\n  margin: 0;\n  border-style: outset;\n  border-color: black;\n  text-align: center;\n  font-family: Sans-serif;\n  font-weight: 900;\n  border-radius: 100%;\n  line-height: 700%;\n  user-select: none; }\n\n.start-button:active {\n  box-shadow: 0px 0px 20px lime; }\n\n.strict-button {\n  display: inline;\n  position: absolute;\n  padding: 0;\n  margin: 0;\n  border-style: outset;\n  border-color: black;\n  text-align: center;\n  font-family: Sans-serif;\n  font-weight: 900;\n  border-radius: 100%;\n  line-height: 700%;\n  user-select: none; }\n\nbutton:focus {\n  outline: none; }\n", "", {"version":3,"sources":["/../main.scss"],"names":[],"mappings":"AAEA;EACE,iBAAiB,EAClB;;AAED;EACE,gBAAgB;EAChB,mBAAmB;EACnB,iBAAiB;EACjB,WAAW;EACX,UAAU;EACV,qBAAqB;EACrB,oBAAoB;EACpB,mBAAmB;EACnB,wBAAwB;EACxB,iBAAiB;EACjB,oBAAoB;EACpB,kBAAkB;EAClB,kBAAkB,EACnB;;AAED;EACE,8BAA8B,EAC/B;;AAED;EACE,gBAAgB;EAChB,mBAAmB;EACnB,WAAW;EACX,UAAU;EACV,qBAAqB;EACrB,oBAAoB;EACpB,mBAAmB;EACnB,wBAAwB;EACxB,iBAAiB;EACjB,oBAAoB;EACpB,kBAAkB;EAClB,kBAAkB,EACnB;;AAED;EACE,cAAc,EACf","file":"main.scss","sourcesContent":["@import url('https://fonts.googleapis.com/css?family=Ultra');\r\n@import url('https://fonts.googleapis.com/css?family=Rationale');\r\nbody {\r\n  background: #777;\r\n}\r\n\r\n.start-button {\r\n  display: inline;\r\n  position: absolute;\r\n  background: lime;\r\n  padding: 0;\r\n  margin: 0;\r\n  border-style: outset;\r\n  border-color: black;\r\n  text-align: center;\r\n  font-family: Sans-serif;\r\n  font-weight: 900;\r\n  border-radius: 100%;\r\n  line-height: 700%;\r\n  user-select: none;\r\n}\r\n\r\n.start-button:active {\r\n  box-shadow: 0px 0px 20px lime;\r\n}\r\n\r\n.strict-button {\r\n  display: inline;\r\n  position: absolute;\r\n  padding: 0;\r\n  margin: 0;\r\n  border-style: outset;\r\n  border-color: black;\r\n  text-align: center;\r\n  font-family: Sans-serif;\r\n  font-weight: 900;\r\n  border-radius: 100%;\r\n  line-height: 700%;\r\n  user-select: none;\r\n}\r\n\r\nbutton:focus {\r\n  outline: none;\r\n}"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html";

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map