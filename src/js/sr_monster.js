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
SR_Monster = function(x, y, type) {
	SR_Base.prototype.constructor.call(this, x, y);

	this.tile = gVars.token.MONSTER_SKULL;
	this.type = type;
	this.anim = sgx.graphics.AnimationManager.get().createState();

	if (type == gVars.token.MONSTER_ALIEN) {
		this.gfx = gVars.textures.alien;
		this.anim.setAnimationDataSet(gVars.animations.alien );
	} else {
		this.gfx = gVars.textures.monster;
		this.anim.setAnimationDataSet(gVars.animations.monster);
	}

	this.anim.startSequence("move");

	this.movement_count = 0;
	this.speed = gVars.monsterBaseSpeed;
	this.last_dir = 0;		// slightly erroneous, but it saves conflueted logic later

	this.isDying = false;
}
Inheritance_Manager.extend(SR_Monster, SR_Base);

SR_Monster.prototype.getCollisions = function(collisionData, rc) 	{ 
	if (this.hasCollided(rc)) {
		collisionData.monsterList.push(this);
		collisionData.isSpace = false;
	}
}

SR_Monster.prototype.canIMoveBy = function(dx, dy)
{
	var nx = this.x + gVars.tilesize * dx;
	var ny = this.y + gVars.tilesize * dy;

	return this.canIMoveTo(nx, ny);
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

		// V2. Better monster movement. @todo AI to chase player
		var options = [ [-1,0], [0,-1], [1,0], [0,1] ];
		var available = [];

		for(var i=0;i<4;++i) {
			available[i] = this.canIMoveBy(options[i][0], options[i][1]);
		}

		var move_option;
		var preferred_dir;
		if (this.type == gVars.token.MONSTER_ALIEN) {
			preferred_dir = (this.last_dir + 1) & 3;	// right
		} else {
			preferred_dir = (this.last_dir - 1) & 3;	// left
		}

		// Keep going in the same direction, most of the time
		if (available[this.last_dir] && sgxRand() > 0.2) {
			move_option = this.last_dir;
		// Turn in this monster prefered direction
		} else if (available[preferred_dir] && sgxRand() > 0.2) {
			move_option = preferred_dir;
		// Pick something random
		} else {
			for(var attempt=0;attempt<4;++attempt) {
				var try_in_dir = sgxRand(0, options.length);
				if (available[try_in_dir]) {
					move_option = try_in_dir;
					break;
				}
			}
		}

		// Now pick one...
		if (options.length && move_option !== undefined) {
			var nx = this.x + gVars.tilesize * options[move_option][0];
			var ny = this.y + gVars.tilesize * options[move_option][1];
			var newObject = gVars.currentLevel.getObjectAt(nx, ny);

			if (newObject) {
				if (newObject.killByMonster) {
					sgx.audio.Engine.get().playSound("eaten");
					newObject.killByMonster();
				}
			}

			this.last_dir = move_option;
			
			gVars.currentLevel.moveGameObject(this, nx, ny);	
		}
	}

}

SR_Monster.prototype.killByRock = function() {
	if (!this.isDying) {
		this.setAnim("die");
		this.isDying = true;

		if (this.type == gVars.token.MONSTER_ALIEN) {	// or SKULL
			gVars.currentLevel.removeGameObject(this);
			gVars.currentLevel.addDiamonds3x3(this.x, this.y);
			sgx.audio.Engine.get().playSound("gotdiamond");
		}
	}
}
