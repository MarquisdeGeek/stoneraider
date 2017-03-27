/**

STONE RAIDER II

Copyright 2017
Steven Goodwin. 

This file is released under the GNU General Public License Version 3.

Please see the licensing conditions for details.

The latest version is generally available at:
	https://github.com/marquisdegeek/stoneraider

Play it at:
	https://marquisdegeek.com/code_stoneraider
*/


/**
 * 
 * @constructor
 */
function GamePlayer(uiData) {
	var sstate;
	var currentLevel;
	var x;
	var y;
	var isPaused;
	var playerHasExpired; 
	var ui;
	//
	var ui_score;
	var ui_lives;
	var ui_bonus;
	var ui_diamonds;
	var ui_left;

	var srObject;

	var data;
	var wasMovingLeft;
	var isMoving;
	var movement_count;
	var pushRockCount;
	var isRockMoving;

	(function ctor(uiData) {
		animStatePlayer = sgx.graphics.AnimationManager.get().createState();
		animStatePlayer.setAnimationDataSet(gVars.animations.player);

		animPlayerWin = sgx.graphics.AnimationManager.get().createState();
		animPlayerWin.setAnimationDataSet(gVars.animations.playerwin);

		animStateClingingRope = sgx.graphics.AnimationManager.get().createState();
		animStateClingingRope.setAnimationDataSet(gVars.animations.rope);

		ui = uiData;

		ui_score = new GameStyleText("score", 0, 6);
		ui_lives = new GameStyleText("lives", 0, 3);
		ui_bonus = new GameStyleText("ui_bonus", 0, 3);
		ui_diamonds = new GameStyleText("points", 0, 3);
		ui_left = new GameStyleText("diamonds", 0, 3);

	})(uiData);

	function updateUI() {
		ui_score.set(data.score);
		ui_lives.set(data.lives);
		ui_bonus.set(sgxFloor(data.bonus));
		ui_diamonds.set(data.diamonds_got);
		ui_left.set(data.diamonds_left);
	}	

	function startGame(gameData) {
		data = gameData;
		data.score = 0;
		data.lives = 3;
	}

	function startLevel(level) {
		var surface = sgx.graphics.DrawSurfaceManager.get().getDisplaySurface();
		var screenWidth = surface.getWidth();

		currentLevel = level;

		isPaused = false;
		playerHasExpired = false;

		data.diamonds_left = level.getDiamondCount();
		data.bonus = 100;
		data.diamonds_got = 0;

		updateUI();

		movement_count = 0;
		wasMovingLeft = true;
		isMoving = false;
		currentAnim = undefined;

		pushRockCount = 0;
		isRockMoving = false;

		sstate = new sgxStateMachine({
			'waiting': { 
				onStart: function(params) { 
					sgx.audio.Engine.get().playSound("startgame");
				},
				onUpdate: function(params, surface, telaps, timecum) {
					if (timecum > gVars.tLevelIntroTimeout + gVars.tLevelIntroFadeout) {
						sstate.changeState('maingame');
					}
				},
			},
			'maingame': { 
				onStart: function(params) { 
					newLife();
				},
				onUpdate: function(params, surface, telaps, timecum) {
					updateLiving(surface, telaps);
					if (srObject.isDead || srObject.isDying)
					{
						srObject.update(telaps);
					} else {
						updateMotion(surface, telaps);
					}	
					updateUI();
				},
			},


			'dead': {
				onStart: function(params) {
					data.lives--;

				},
				onUpdate: function(params, surface, telaps, timecum) {
					if (timecum > gVars.tPostDeathWait) {
						//todo if lives
						
						if (data.lives == 0) {
							playerHasExpired = true;
							data.health = 0;	// @todo hack to match bounce
							sstate.changeState('inert');	
						} else {
							sstate.changeState('maingame');	
						}
						
					}
				},
			},

			'inert': {
				onStart: function(params) {
				},
				onUpdate: function(params, surface, telaps, timecum) {
				}
			},
			'endlevel': {
				onStart: function(params) {
					sgx.audio.Engine.get().playSound("endlevel");
				},
				onUpdate: function(params, surface, telaps, timecum) {
					if (timecum > gVars.tPostGameWait ) {
							playerHasExpired = true;
							data.health = 10;	// @todo hack to match bounce
					}
				}
			}
		});

		sstate.changeState('maingame', {targetx: 0});
	}

	function newLife() {
		srObject.newLife();
	}

	function draw(surface, viewportRect) {

		if (sstate.isState('waiting')) {
			var alpha = 1;//(timecum - gVars.tLevelIntroTimeout) / gVars.tLevelIntroFadeout;
			var color = new sgxColorRGBA(0,0,0, alpha);
			surface.setFillColor(sgxColorRGBA.White);

			surface.setFillTexture(gVars.textures.level_intro);
			surface.fillRect();
		}
	}

	function postDraw(surface, viewportRect) {
		if (sstate.isState('waiting')) {
			return;
		}

		var surface = sgx.graphics.DrawSurfaceManager.get().getDisplaySurface();

		ui_score.draw(surface, 172, 16);
		ui_bonus.draw(surface, 172-24, 16+16);

		ui_lives.draw(surface, 256+34, 24);

		ui_diamonds.draw(surface, 495, 16);
		ui_left.draw(surface, 495, 16+16);

		srObject.postDraw(surface, viewportRect);
		//sstate.draw(surface);	// usually a nop - since the update prepares what the state will draw
	}


	function pause() {
		isPaused = true;
	}

	function resume() {
		isPaused = false;
	}

	function setSRObject(obj) {
		srObject = obj;
	}

	function setLevelStats(diamonds) {
		ui_diamonds.set(diamonds);
	}

	function update(surface, telaps) {

		if (isPaused) {
			return;
		}

		sstate.update(surface, telaps);
	}

	function updateLiving(surface, telaps) {

		if (srObject.isDead) {
			playerHasExpired = true;
			sstate.changeState('dead');
			return;
		}
		if (srObject.isDying) {
			return;
		}

		if (sgx.input.Engine.get().isKeyboardKeyPressed(SGX_KEY_BACKTICK)) {
			srObject.die();
		}

		data.bonus -= telaps * gVars.bonusSpeed;
		if (data.bonus < 0) {
			data.bonus = 0;
			srObject.die();
			//sstate.changeState('dead');
		}
	}

	function updateMotion(surface, telaps) {

		var delta = gVars.tilesize;
		var tilesize = gVars.tilesize;
		var movement_delay = gVars.playerMovementDelay;
		var xpos = srObject.x;
		var ypos = srObject.y;

		if (!wasMovingLeft && sgx.input.Engine.get().isKeyboardKeyPressed(SGX_KEY_LEFT)) {
			movement_count = 0;
		}
		if (wasMovingLeft && sgx.input.Engine.get().isKeyboardKeyPressed(SGX_KEY_RIGHT)) {
			movement_count = 0;
		}

		if (movement_count == 0) {
			var dimensions = currentLevel.getLevelDimensions();
			var xprev = xpos;
			var yprev = ypos;
			var xpospush = undefined;
			var new_anim = undefined;
			var dig_only = false;
			movement_count = movement_delay;

			if (sgx.input.Engine.get().isKeyboardKeyDown(SGX_KEY_SHIFT)) {
				dig_only = true;
			}

			if (sgx.input.Engine.get().isKeyboardKeyPressed(SGX_KEY_LEFT)) {
				xpos = sgxMax(xpos-delta, 0);
				xpospush = xpos - delta;
				wasMovingLeft = true;
				new_anim = "walk_left";
			
			} else if (sgx.input.Engine.get().isKeyboardKeyPressed(SGX_KEY_RIGHT)) {
				xpos = sgxMin(xpos+delta, dimensions.width*tilesize);
				xpospush = xpos + delta;
				wasMovingLeft = false;
				new_anim = "walk_right";
			} else if (sgx.input.Engine.get().isKeyboardKeyPressed(SGX_KEY_UP)) {
				ypos = sgxMax(ypos-delta, 0);
				new_anim = (wasMovingLeft ? "walk_left" : "walk_right");
			} else if (sgx.input.Engine.get().isKeyboardKeyPressed(SGX_KEY_DOWN)) {
				ypos = sgxMin(ypos+delta, dimensions.height*tilesize);
				new_anim = (wasMovingLeft ? "walk_left" : "walk_right");
			} else {
				movement_count = 0;
				isMoving = false;
				srObject.setAnim(wasMovingLeft ? "idle_left" : "idle_right");
			}
			//
			if (movement_count) {
				// A little latch to stop the anim getting restart on each key repeat
				if (!isMoving || currentAnim != new_anim) {
					isMoving = true;
					srObject.setAnim(new_anim);
					currentAnim = new_anim;
				}

				var collisionData = currentLevel.getCollisions(xpos, ypos, 0/*reason:todo*/);

				for(var i=0;i<collisionData.diamondList.length;++i) {
					data.diamonds_left--;
					data.score += 10;
					data.diamonds_got++;

					if (data.diamonds_left == 0) {
						currentLevel.unlockExit();
						sgx.audio.Engine.get().playSound("exit_unlocked");
					} else {
						sgx.audio.Engine.get().playSound("gotdiamond");
					}

					currentLevel.removeGameObject(collisionData.diamondList[i]);
				}
				//
				if (collisionData.immovable) {
					xpos = xprev;
					ypos = yprev;
				} else if (collisionData.earthObj) {		
					sgx.audio.Engine.get().playSound("digearth");
					currentLevel.removeGameObject(collisionData.earthObj);

				} else if (collisionData.endlevel) {
					sstate.changeState('endlevel');

				} else if (collisionData.rockObject !== undefined) {
					var doesRockMove = false;

					if (xpospush != undefined) {
						var othersideCollisionData = currentLevel.getCollisions(xpospush, ypos, 0/*reason:todo*/);

						if (othersideCollisionData.isSpace) {
							var count = isRockMoving ? gVars.rockPushCountSubsequent : gVars.rockPushCount;

							if (++pushRockCount >= count) {
								currentLevel.moveGameObject(collisionData.rockObject, xpospush, ypos);
								pushRockCount = 0;
								doesRockMove = true;
								isRockMoving = true;
							}
						} else {
							isRockMoving = false;
						}
					} 
					//
					if (!doesRockMove) {	// we can't push rocks when moving up or down
						xpos = xprev;
						ypos = yprev;
					}
					
					
				} else if (collisionData.monsterList.length) {
					sgx.audio.Engine.get().playSound("eaten");
					srObject.killByMonster();
				}
				//
				if (collisionData.rockObject === undefined) {
					isRockMoving = false;
				}
				//
				if (dig_only) {
					xpos = xprev;
					ypos = yprev;
				}
				//
				updateUI();
				currentLevel.moveGameObject(srObject, xpos, ypos);
			}
			
		} else {
			--movement_count;
		}
	}

	function addScore(n) {
		// v6. Don't update a flash thing, if there's no change.
		// This happens when grading scores 
		if (n === 0){
			return;
		}
		
		data.score += n;

		if (data.score < 0) {
			data.score = 0;
		}
		
		// v3. You can see that data.score is separate from it's presentative layer
		// (at the expensive of having two things to change - thus the addScore method)
		//ui.score.set(data.score);
		
		// v4. Don't set, change
		ui.score.change(data.score);
	}
		
	function damagePlayer(amount) { 

		if (data.health) {
			data.health -= amount; 
			if (data.health < 0) {
				data.health = 0;
				sstate.changeState('dead');	
			}
			ui.health.change(data.health);
		}
	}
		
	function getCollisionRect(rc) { 
		rc.left = x; 
		rc.top = y; 
		rc.right = rc.left + gVars.textures.player.getRegionWidth(0); 
		rc.bottom = rc.top + gVars.textures.player.getRegionHeight(0); 
	}

	return {
		startGame: function(gameData) 			{ return startGame(gameData); },
		startLevel: function(level) 			{ return startLevel(level); },
		draw: function(surface, viewportRect) 	{ return draw(surface, viewportRect); },
		postDraw: function(surface, viewportRect) { return postDraw(surface, viewportRect); },

		pause: function() 					{ pause(); },
		resume: function() 					{ resume(); },

		update: function(surface, telaps) 	{ update(surface, telaps); },

		setSRObject: function(obj)			{ setSRObject(obj); },
		setLevelStats: function(diamonds)			{ setLevelStats(diamonds); },

		// TODOC: v1. isGameOver is incorrect, the player reaches the bottom and/or is dead.
		// However, the game isn't over. The _player_ is. The game should be allowed to continue
		// for a few moments, so the player can see what they missed out on. This let's them
		// curse their stupidity, and convince them to try again.
		// It is perfectly acceptable to introduce extra bonus prizes at this point, as if to say
		// "look how close you were". Don't do it every time, otherwise an astute player will spot
		// the pattern, and
		//isGameOver:function() { return y == 96 ? true : false; },
		hasPlayerExpired:function() 		{ return playerHasExpired; },
		isPlayerDead: function()			{ return srObject.isDead; },
		getPlayerLives: function()			{ return data.lives; },
		getHealth: function() 				{ return data.health; },

		damagePlayer: function(amount)		{ damagePlayer(amount); },
		
		getCollisionRect:function(rc) 		{ getCollisionRect(); },

		getPositionX: function() 			{ return srObject.x; },
		getPositionY: function() 			{ return srObject.y; },

	};
};
