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
SR_Monster = function(x, y) {
	SR_Base.prototype.constructor.call(this, x, y);

	this.gfx = gVars.textures.monster;
	this.tile = gVars.token.MONSTER;

	this.anim = sgx.graphics.AnimationManager.get().createState();
	this.anim.setAnimationDataSet(gVars.animations.monster);
	this.anim.startSequence("move");

	this.movement_count = 0;
	this.speed = gVars.monsterBaseSpeed;

	this.isDying = false;
}
Inheritance_Manager.extend(SR_Monster, SR_Base);

SR_Monster.prototype.getCollisions = function(collisionData, rc) 	{ 
	if (this.hasCollided(rc)) {
		collisionData.monsterList.push(this);
		collisionData.isSpace = false;
	}
}

SR_Monster.prototype.canIMoveTo = function(x, y)
{
	var d = gVars.currentLevel.getLevelDimensions();
	if (x < 0 || y < 0 || x >= d.width * gVars.tilesize || y >= d.height * gVars.tilesize) {
		return false;
	}

	var collisionData = gVars.currentLevel.getCollisions(x, y, 0/*reason:todo*/);

	if (collisionData.isSpace || collisionData.playerObject) {
		return true;
	}
	return false;
}

SR_Monster.prototype.update = function(telaps)
{
	SR_Base.prototype.update.call(this, telaps);

	if (this.isDying) {
		if (this.anim.m_bExtent) {
			gVars.currentLevel.removeGameObject(this);
		}
		return;
	}

	if (++this.movement_count == this.speed) {
		this.movement_count = 0;

		// V1. Random monster movement. @todo AI to chase player
		var options = new Array();

		// Collate all possible moves
		if (this.canIMoveTo(this.x - gVars.tilesize, this.y)) {
			options.push([-1,0]);
		}
		if (this.canIMoveTo(this.x + gVars.tilesize, this.y)) {
			options.push([1,0]);
		}
		if (this.canIMoveTo(this.x, this.y - gVars.tilesize)) {
			options.push([0,-1]);
		}
		if (this.canIMoveTo(this.x, this.y + gVars.tilesize)) {
			options.push([0,1]);
		}

		// Now pick one...
		if (options.length) {
			var move_option = sgxRand(0, options.length);
			var nx = this.x + gVars.tilesize * options[move_option][0];
			var ny = this.y + gVars.tilesize * options[move_option][1];
			var newObject = gVars.currentLevel.getObjectAt(nx, ny);

			if (newObject) {
				if (newObject.killByMonster) {
					sgx.audio.Engine.get().playSound("eaten");
					newObject.killByMonster();
				}
			}
			
			gVars.currentLevel.moveGameObject(this, nx, ny);	
		}
	}

}

SR_Monster.prototype.killByRock = function() {
	if (!this.isDying) {
		this.setAnim("die");
		this.isDying = true;
	}
}
