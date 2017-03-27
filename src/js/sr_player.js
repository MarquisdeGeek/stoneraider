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
SR_Player = function(x, y) {
	SR_Base.prototype.constructor.call(this, x, y);

	this.gfx = gVars.textures.player;
	this.tile = gVars.token.PLAYER;
	this.isDying = false;
	this.isDead = false;

	this.anim = sgx.graphics.AnimationManager.get().createState();
	this.anim.setAnimationDataSet(gVars.animations.player);
	
}
Inheritance_Manager.extend(SR_Player, SR_Base);

SR_Player.prototype.newLife = function() {
	this.isDying = false;
	this.isDead = false;	
}

SR_Player.prototype.getCollisions = function(collisionData, rc) 	{ 
	if (this.hasCollided(rc)) {
		collisionData.playerObject = this;
		collisionData.isSpace = false;
	}
}


SR_Player.prototype.die = function() {
	if (!this.isDying) {
		this.setAnim("die");
		this.isDying = true;
	}
}

SR_Player.prototype.killByRock = function() {
	if (!this.isDying) {
		this.die();
	}
}

SR_Player.prototype.killByMonster = function() {
	if (!this.isDying) {
		this.die();
	}
}



SR_Player.prototype.draw = function(surface, viewportRect)
{
	if (!this.isDying && !this.isDead) {
		SR_Base.prototype.draw.call(this, surface, viewportRect);
	}
}

// @todo all objkects to have a postDraw
SR_Player.prototype.postDraw = function(surface, viewportRect)
{
	if (this.isDying && !this.isDead) {
		var cell =  this.anim ? this.anim.getCurrentCell() : 0;
		var xp = this.x - viewportRect.left;
		var yp = gVars.topoffset + this.y - viewportRect.top;

		surface.setFillTexture(this.gfx, cell);
		for(var y=-gVars.tilesize;y<=gVars.tilesize;y+=gVars.tilesize) {
			for(var x=-gVars.tilesize;x<=gVars.tilesize;x+=gVars.tilesize) {
				surface.fillRect(xp+x, yp+y, xp+x+gVars.tilesize, yp+y+gVars.tilesize);
			}
		}
	}
}

//
SR_Player.prototype.update = function(telaps)
{
	SR_Base.prototype.update.call(this, telaps);
	
	if (this.isDying && !this.isDead && this.anim.m_bExtent) {
		this.isDead = true;
		this.remove();

		for(var y=-gVars.tilesize;y<=gVars.tilesize;y+=gVars.tilesize) {
			for(var x=-gVars.tilesize;x<=gVars.tilesize;x+=gVars.tilesize) {
				var idx = gVars.currentLevel.getTileIndexOf(this.x+x, this.y+y);
				var tile = gVars.currentLevel.getTileAt(idx);

				if (tile != gVars.token.WALL && tile != gVars.token.EDGE) {
					gVars.currentLevel.removeGameObjectAt(idx);
				} 
			}
		}
	}
}
