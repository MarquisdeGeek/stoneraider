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
function SR_Base(x, y) {
	this.active = true;
	this.visible = true;
	this.x = x;
	this.y = y;
	this.w = this.h = gVars.tilesize;
	//
	this.anim = null;
	this.gfx = null;
}
SR_Base.prototype.isAt = function(x, y) 	{ return false; }
SR_Base.prototype.getCollisions = function(collisions, rc) 	{ 
	if (this.hasCollided(rc)) {
		collisions.isSpace = false;	
	}
}

SR_Base.prototype.hasCollided = function(rc) {
	if (this.active && this.visible) {
		if (this.x < rc.right && this.x+this.w > rc.left 
			&& this.y < rc.bottom && this.y+this.h > rc.top) {
			return true;
		}
	}
	return false;
}

SR_Base.prototype.update = function(telaps) {
	if (!this.active) {
		return;
	}

	if (this.anim) {
		this.anim.update(telaps);
	}
}

SR_Base.prototype.updateGravity = function(telaps) {

}
SR_Base.prototype.killByRock = function() {

}

// @todo supercede by the mapIndexed in level ?
SR_Base.prototype.remove = function(telaps) {
	this.visible = this.active = false;
}


SR_Base.prototype.draw = function(surface, viewportRect) {
	if (!this.visible) {
		return;
	}

	var cell =  this.anim ? this.anim.getCurrentCell() : 0;
	var xp = this.x - viewportRect.left;
	var yp = gVars.topoffset + this.y - viewportRect.top;

	surface.setFillTexture(this.gfx, cell);
	surface.fillRect(xp, yp, xp+gVars.tilesize, yp+gVars.tilesize);
}
					
SR_Base.prototype.setAnim = function(anim_name)  {
	if (this.anim) {
		this.anim.startSequence(anim_name);	
	}
}
