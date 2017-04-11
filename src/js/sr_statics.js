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
function SR_Earth(x, y) {
	SR_Base.prototype.constructor.call(this, x, y);

	this.gfx = gVars.textures.earth;
	this.tile = gVars.token.EARTH;
}
Inheritance_Manager.extend(SR_Earth, SR_Base);

SR_Earth.prototype.getCollisions = function(collisionData, rc) 	{ 
	if (this.hasCollided(rc)) {
		collisionData.isSpace = false;
		collisionData.earthObj = this;
	}
}

/**
 * 
 * @constructor
 */
function SR_Edge(x, y) {
	SR_Base.prototype.constructor.call(this, x, y);

	this.gfx = gVars.textures.edge;
	this.tile = gVars.token.EDGE;
}
Inheritance_Manager.extend(SR_Edge, SR_Base);

SR_Edge.prototype.getCollisions = function(collisionData, rc) 	{ 
	if (this.hasCollided(rc)) {
		collisionData.immovable = true;
		collisionData.isSpace = false;
	}
}

/**
 * 
 * @constructor
 */
function SR_Blank(x, y) {
	SR_Base.prototype.constructor.call(this, x, y);

	this.gfx = gVars.textures.blank;
	this.tile = gVars.token.SPACE;
}
Inheritance_Manager.extend(SR_Blank, SR_Base);

SR_Blank.prototype.getCollisions = function(collisionData, rc) 	{ 
}


/**
 * 
 * @constructor
 */
function SR_Diamond(x, y) {
	SR_Base.prototype.constructor.call(this, x, y);

	this.gfx = gVars.textures.diamond;
	this.tile = gVars.token.DIAMOND;
}
Inheritance_Manager.extend(SR_Diamond, SR_Base);

SR_Diamond.prototype.getCollisions = function(collisionData, rc) 	{ 
	if (this.hasCollided(rc)) {
		collisionData.isSpace = false;
		collisionData.diamondList.push(this);
	}
}

/**
 * 
 * @constructor
 */
function SR_Wall(x, y) {
	SR_Base.prototype.constructor.call(this, x, y);

	this.gfx = gVars.textures.wall;
	this.tile = gVars.token.WALL;
}
Inheritance_Manager.extend(SR_Wall, SR_Base);

SR_Wall.prototype.getCollisions = function(collisionData, rc) 	{ 
	if (this.hasCollided(rc)) {
		collisionData.immovable = true;
		collisionData.isSpace = false;
	}
}

/**
 * 
 * @constructor
 */
function SR_Exit(x, y) {
	SR_Base.prototype.constructor.call(this, x, y);

	this.anim = sgx.graphics.AnimationManager.get().createState();
	this.anim.setAnimationDataSet(gVars.animations.exit);
	this.anim.startSequence("normal");

	this.gfx = gVars.textures.exit;
	this.tile = gVars.token.EXIT;

	this.isHidden = true;
}
Inheritance_Manager.extend(SR_Exit, SR_Base);

SR_Exit.prototype.getCollisions = function(collisionData, rc) 	{ 
	if (this.hasCollided(rc)) {
		if (this.isHidden) {
			collisionData.immovable = true;
		} else {
			collisionData.endlevel = true;
		}
		collisionData.isSpace = false;
	}
}

SR_Exit.prototype.unlock = function(telaps)
{
	if (this.isHidden) {
		this.anim.startSequence("exit");
		this.isHidden = false;
	}
}

