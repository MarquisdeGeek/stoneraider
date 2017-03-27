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
function GamePlay(changeState) {
var GAME_IS_STARTING = 0;
var GAME_IS_PLAYING = 1;
var GAME_IS_WATCHING_PLAYER_DIE = 2;
var GAME_IS_DOING_GAME_OVER_ANIM = 3;
var GAME_IS_AWAITING_RESTART = 4;
var GAME_IS_RUNNING_IGM = 5;
var GAME_IS_RETURNING_TO_MENU = 6;
var GAME_IS_PREPARING_NEXT_LEVEL = 7;
var GAME_IS_WAITING_FOR_NEXT_LEVEL = 8;
var GAME_RETRIES_CURRENT_LEVEL = 9;
var currentLevel;
var playerData;
var data;
var viewportRect;	
var ui;
var substate;
var substateTimecum;
var interfaceGame;
var interfaceIGM;
var igmResumeState;
var musicChannel;

	(function ctor() {
		ui = {};
		ui.inmenu = sgxutils.gui.DesignManager.load("resources/ui/game", function(design, success) {
			// prepare interface
			var uiHandlerSelect = function(widget, position) {
				var uid = widget.getUserData();
				switch(uid) {
					case 2:
					openInGameMenu();
					break;

					case 3: // screen wide hotspot
					break;

					// IGM
					case 0x201:
					gui.toggleMuteMusic(widget, musicChannel, startMusic);
					break;

					case 0x301:
					gui.toggleMuteSFX(widget);
					break;

					case 11:
					closeInGameMenu();
					break;

					case 12:
					closeInGameMenu();

					if (!musicChannel.isPlaying()) {
						changeState('mainmenu');
					} else {
						setSubstate(GAME_IS_RETURNING_TO_MENU);
						musicChannel.startFadeOut(gVars.tMusicFadeOut, function(e) {
							changeState('mainmenu');
						});
					}
					break;
				}
			}

			var uiHandlerPressed = function(widget, position) {
				if (3 !== widget.getUserData()) {
					sgx.audio.Engine.get().playSound("click");
				}
				return true;
			};

			interfaceGame = ui.inmenu.getScreen(0).applyScreen();
			interfaceGame.setHandler({onGUIWidgetSelect:uiHandlerSelect, onGUIWidgetPressed:uiHandlerPressed}, TRUE);

			interfaceIGM = ui.inmenu.getScreen(1).applyScreen();
			interfaceIGM.setHandler({onGUIWidgetSelect:uiHandlerSelect, onGUIWidgetPressed:uiHandlerPressed}, TRUE);


			sgx.filesystem.Engine.get().blockingCompletedElement(design, success);
		});
		sgx.filesystem.Engine.get().blockingRegisterElement(ui.inmenu);

		viewportRect = new sgxRect2f(0, gVars.topOfWorld, 0, 0);
		playerData = new GamePlayer(ui);

		gVars.playerData = playerData;	// @todo remove this hack

		
		ui.score = GameStyle.createStyledText('score');
		ui.health = GameStyle.createStyledText('health');
	})();

	function startGame(surface) {
		data = {level: 0};

		playerData.startGame(data);

		newLevel();
	}

	function newLevel() {
		currentLevel = new GameLevel(data.level);
		gVars.currentLevel = currentLevel;	// @todo remove this hack

		playerData.startLevel(currentLevel);
		
		// Now level-specific
		setSubstate(GAME_IS_STARTING);

		sgx.gui.Engine.get().setRootWidget(interfaceGame);

		sgx.audio.Engine.get().playSound("startgame");
		startMusic();
//		setTimeout(function() { sgx.audio.Engine.get().playSound("swoosh"); }, 500);
	}

	function nextLevel() {
		++data.level;
		newLevel();
	}

	function retryLevel() {
		newLevel();
	}

	function setSubstate(state) {
		substate = state;
		substateTimecum = 0;
	}

	function startMusic() {
		musicChannel = sgx.audio.Engine.get().playSound("ingame");
		musicChannel.loop();
	}
	
	function openInGameMenu() {
		if (substate !== GAME_IS_RUNNING_IGM) {
			igmResumeState = substate;
			pauseGame();
			setSubstate(GAME_IS_RUNNING_IGM);
			sgx.gui.Engine.get().setRootWidget(interfaceIGM);

			gui.refreshWidgetMusic(interfaceIGM.getWidgetOfUserData(0x201));
			gui.refreshWidgetSFX(interfaceIGM.getWidgetOfUserData(0x301));
		}
	}

	function closeInGameMenu() {
		if (substate === GAME_IS_RUNNING_IGM) {
			setSubstate(igmResumeState);
			sgx.gui.Engine.get().setRootWidget(interfaceGame);

			resumeGame();
		}
	}

	function draw(surface) {

		currentLevel.draw(surface, viewportRect);
		playerData.draw(surface, viewportRect);	

		currentLevel.postDraw(surface, viewportRect);
		playerData.postDraw(surface, viewportRect);	

		switch(substate) {
			case GAME_IS_STARTING:

			var alpha = (substateTimecum - gVars.tPreGameWait) / gVars.tPreGameFade;
			if (substateTimecum < gVars.tPreGameWait) {
				alpha = 0;
			}
			var color = new sgxColorRGBA(1,1,1, sgxMin(1, 1 - alpha));

			surface.setFillColor(color);
			surface.setFillTexture(gVars.textures.level_intro);
			surface.fillRect();			
			break;

		
			case GAME_IS_RETURNING_TO_MENU:
				// The screen fade expects to happen over 3 seconds, but out
				// fade time might vary, therefore rescale here.
				drawScreenFadeOut(surface, substateTimecum / gVars.tFadeToMenu);
				break;

			case GAME_IS_DOING_GAME_OVER_ANIM:
				drawGameOver(surface, substateTimecum);
				break;

			case GAME_IS_PREPARING_NEXT_LEVEL:
				drawNextLevel(surface, substateTimecum);
				break;
			case GAME_RETRIES_CURRENT_LEVEL:
				//drawNextLevel(surface, substateTimecum);
				break;

			case GAME_IS_WAITING_FOR_NEXT_LEVEL:
				drawNextLevel(surface, gVars.tFadeToNextLevel);
				break;
			
			case GAME_IS_AWAITING_RESTART:
				drawGameOverFade(surface, substateTimecum);
				drawGameOver(surface, 1.0);
				break;

			case GAME_IS_RUNNING_IGM:
				drawScreenFade(surface, 3*substateTimecum);	// fast fade for IGM
				surface.setFillColor(sgxColorRGBA.White);
				interfaceIGM.draw(surface, 96, -25);
				break;

			default:
			// TODO: Move this elsewhere? Just ignore it?
				//interfaceGame.draw(surface, 0, 0);
				break;
		}
	}

	function drawScreenFade(surface, t) {
		drawScreenFadeOut(surface, sgxMin(t, 1) * 0.7);
	}

	function drawScreenFadeOut(surface, alpha) {
		if (gVars.bUseFade)
		{
			var color = new sgxColorRGBA(0,0,0, alpha);
			surface.setFillColor(color);
			surface.setFillTexture(gVars.textures.blackground);
			surface.fillRect();
		}
	}

	function drawNextLevel(surface, t) {
		var t = sgxMin(t, 4) / 4;	// scales between 0 and 1, over 4 seconds
		var width = t * gVars.textures.gameOver.getRegionWidth(2);
		var height = t * gVars.textures.gameOver.getRegionHeight(2);

		surface.setFillColor(sgxColorRGBA.White);
		surface.setFillTexture(gVars.textures.gameOver, 1);

		var x = (surface.getWidth() - width) / 2;
		var y = 100;
		surface.fillRect(x, y, x + width, y + height);
	}

	function drawGameOver(surface, t) {
		var width = t * gVars.textures.gameOver.getRegionWidth(0);
		var height = t * gVars.textures.gameOver.getRegionHeight(0);

		surface.setFillColor(sgxColorRGBA.White);
		surface.setFillTexture(gVars.textures.gameOver);

		var x = (surface.getWidth() - width) / 2;
		var y = 10;
		surface.fillRect(x, y, x + width, y + height);
	}

	function drawGameOverFade(surface, t) {
		
		drawScreenFade(surface, t);

		var color = new sgxColorRGBA(1, 1, 1, sgxMin(t*3, 1)); // It fades up really quick, compared to the fade out,

		surface.setFillColor(color);
		surface.setFillTexture(gVars.textures.gameOver, 2);
		surface.fillPoint(surface.getWidth() / 2, 285);
	}
	
	function pauseGame() {
		playerData.pause();
	}

	function resumeGame() {
		playerData.resume();
	}
	
	function update(surface, telaps) {
		if (sgx.input.Engine.get().isKeyboardKeyPressed(SGX_KEY_ESCAPE)) {
			if (substate === GAME_IS_RUNNING_IGM) {
				closeInGameMenu();	
			} else {
				openInGameMenu();	
			}
			return;
		}

		playerData.update(surface, telaps);
		currentLevel.update(surface, telaps);
		
		ui.score.update(surface, telaps);
		ui.health.update(surface, telaps);


		var screenWidth = surface.getWidth();
		var screenHeight = surface.getHeight();
		var mapAreaHeight = screenHeight - gVars.topoffset;

		var xpos = playerData.getPositionX();
		var ypos = playerData.getPositionY();

		var dimensions = currentLevel.getLevelDimensions();
		var map_width_px = dimensions.width * gVars.tilesize;	// total size
		var map_height_px = dimensions.height * gVars.tilesize;	// total size

		viewportRect.left = xpos - screenWidth/2;
		if (viewportRect.left < 0) {
			viewportRect.left = 0;
		} else if (viewportRect.left + screenWidth >= map_width_px) {
			viewportRect.left = map_width_px - screenWidth;
		}
		viewportRect.right = viewportRect.left + screenWidth;


		viewportRect.top = ypos - screenHeight/2;
		if (viewportRect.top < 0) {
			viewportRect.top = 0;
		} else if (viewportRect.top + mapAreaHeight > map_height_px) {
			viewportRect.top = map_height_px - mapAreaHeight;
		}
		viewportRect.bottom = viewportRect.top + mapAreaHeight;


		substateTimecum += telaps;

		switch(substate) {
			case GAME_IS_STARTING:
			if (substateTimecum > gVars.tPreGameWait + gVars.tPreGameFade) {
				setSubstate(GAME_IS_PLAYING);
			}
			break;

			case GAME_IS_PLAYING:
			if (playerData.hasPlayerExpired()) {
				musicChannel.startFadeOut(gVars.tFadeToMenu);

				if (playerData.isPlayerDead()) {
					setSubstate(GAME_IS_WATCHING_PLAYER_DIE);
				} else {
					setSubstate(GAME_IS_PREPARING_NEXT_LEVEL);	
				}
			}
			break;

			case GAME_IS_PREPARING_NEXT_LEVEL:
			if (sgx.input.Engine.get().mouseLeft.wasPressed() || sgx.input.Engine.get().isAnyKeyPressed()) {
				nextLevel();
			} else if (substateTimecum > gVars.tFadeToNextLevel) {	
				setSubstate(GAME_IS_WAITING_FOR_NEXT_LEVEL);
				sgx.audio.Engine.get().playSound("endgame");

			}
			break;
			case GAME_IS_WAITING_FOR_NEXT_LEVEL:
			if (sgx.input.Engine.get().mouseLeft.wasPressed() || sgx.input.Engine.get().isAnyKeyPressed()) {
				//nextLevel();
				changeState('mainmenu');
			}
			break;


			case GAME_IS_WATCHING_PLAYER_DIE:
			if (substateTimecum > gVars.tFadeToGameOver) {	

				if (playerData.getPlayerLives() == 0) {
					sgx.audio.Engine.get().playSound("endgame");
					setSubstate(GAME_IS_DOING_GAME_OVER_ANIM);
				} else {
					setSubstate(GAME_RETRIES_CURRENT_LEVEL);
				}
			}
			break;

			case GAME_RETRIES_CURRENT_LEVEL:
			if (substateTimecum > gVars.tDelayForRetryLevel) {	
				retryLevel();
			}
			break;

			case GAME_IS_DOING_GAME_OVER_ANIM:
			if (sgx.input.Engine.get().mouseLeft.wasPressed() || sgx.input.Engine.get().isAnyKeyPressed()) {
				changeState('mainmenu');
			} else if (substateTimecum > 1) {
				setSubstate(GAME_IS_AWAITING_RESTART);
			}
			break;
			case GAME_IS_AWAITING_RESTART:
			if (sgx.input.Engine.get().mouseLeft.wasPressed() || sgx.input.Engine.get().isAnyKeyPressed()) {
				changeState('mainmenu');
			}
			break;
		}
	}
	

	return {
		start: function(surface)			{ return startGame(surface); },
		draw: function(surface) 			{ return draw(surface); },
		update: function(surface, telaps) 	{ return update(surface, telaps); }
	};
}
