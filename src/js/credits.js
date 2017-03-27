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
function GameCredits(changeState) {
var	creditsUI;
var	creditsScreen;
var animState;
var animPlayerX;
var overlayEffect;

	(function ctor() {
		overlayEffect = new GameStyleEffect();

		creditsUI = sgxutils.gui.DesignManager.load("resources/credits/ui", function(design, success) {
			creditsScreen = design.getScreen(0).applyScreen();
			sgx.filesystem.Engine.get().blockingCompletedElement(design, success);
		});
		sgx.filesystem.Engine.get().blockingRegisterElement(creditsUI);
	})();

	function start(surface) {
		animState = sgx.graphics.AnimationManager.get().createState();
		animState.setAnimationDataSet(gVars.animations.player);
		
		animState.startSequence("walk_left"); 
		animPlayerX = 840;

		sgx.audio.Engine.get().playSound("credits");
	}

	function draw(surface) {
		creditsScreen.draw(surface, 0, 0);

		var cell = animState.getCurrentCell();
		surface.setFillTexture(gVars.textures.player, cell);
		surface.fillPoint(animPlayerX, 384-32-10, sgx.graphics.DrawSurface.eFromTopLeft);

		overlayEffect.draw(surface);	
	}
	
	function update(surface, telaps) {
		overlayEffect.update(surface, telaps);

		animState.update(telaps);
		if (--animPlayerX < -gVars.textures.player.getRegionHeight(0)) {
			animPlayerX = 540;
		}

		if (sgx.input.Engine.get().mouseLeft.wasReleased()) {
			sgx.audio.Engine.get().playSound("click");
			changeState('mainmenu');
		}
	}
	
	return {
		start: function(surface) 			{ return start(surface); },
		draw: function(surface) 			{ return draw(surface); },
		update: function(surface, telaps) 	{ return update(surface, telaps); }
	};
}
