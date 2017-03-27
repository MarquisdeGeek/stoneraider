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
function SR_Rock(x, y) {
	SR_Base.prototype.constructor.call(this, x, y);

	this.gfx = gVars.textures.rock;
	this.tile = gVars.token.ROCK;
	this.fallTimer = 0;
	this.tipCounter = gVars.rockTipTime;
	this.isFalling = false;
}
Inheritance_Manager.extend(SR_Rock, SR_Base);

SR_Rock.prototype.getCollisions = function(collisionData, rc) 	{ 
	if (this.hasCollided(rc)) {
		collisionData.rockObject = this;
		collisionData.isSpace = false;
		collisionData.objects.push(this);
	}
}

SR_Rock.prototype.updateGravity = function(telaps)
{
	// Straight down
	var collisionData = gVars.currentLevel.getCollisions(this.x, this.y + gVars.tilesize);
	if (collisionData.isSpace || collisionData.monsterList.length || collisionData.playerObject) {
		if (this.fallTimer == 0) {
			if (collisionData.isSpace) {
				gVars.currentLevel.moveGameObject(this, this.x, this.y + gVars.tilesize);
				sgx.audio.Engine.get().playSound("rockfall");
				this.isFalling = true;
			} else if (this.isFalling) {
				if (collisionData.playerObject) {
					collisionData.playerObject.killByRock();
				}
				
				for(var i=0;i<collisionData.monsterList.length;++i) {
					collisionData.monsterList[i].killByRock();
				}
				
			}

			this.fallTimer = gVars.rockSpeed;
			
		} else {
			--this.fallTimer;
		}
		
	} else {
		if (this.isFalling) {
			sgx.audio.Engine.get().playSound("rockland");
		}
		this.isFalling = false;
		this.fallTimer = 0;
// @todo :rockObject to Obj, or rest to Object
// @todo : use list?
		if (collisionData.rockObject || collisionData.diamondList.length || collisionData.immovable) {
			var collisionDataLeft = gVars.currentLevel.getCollisions(this.x - gVars.tilesize, this.y);
			var collisionDataLeftDown = gVars.currentLevel.getCollisions(this.x - gVars.tilesize, this.y + gVars.tilesize);
			var collisionDataRight = gVars.currentLevel.getCollisions(this.x + gVars.tilesize, this.y);
			var collisionDataRightDown = gVars.currentLevel.getCollisions(this.x + gVars.tilesize, this.y + gVars.tilesize);

			// Roll off a round thing : diamonds, or other rocks
			if (collisionDataLeft.isSpace && collisionDataLeftDown.isSpace) {	// to the left?
				if (this.tipCounter) {
					--this.tipCounter;
				} else {
					gVars.currentLevel.moveGameObject(this, this.x-gVars.tilesize, this.y);				
					this.isFalling = true;					
				}
			} else if (collisionDataRight.isSpace && collisionDataRightDown.isSpace) {	// to the right?
				if (this.tipCounter) {
					--this.tipCounter;
				} else {
					gVars.currentLevel.moveGameObject(this, this.x+gVars.tilesize, this.y);				
					this.isFalling = true;					
				}
			}
		} else {
			this.tipCounter = gVars.rockTipTime;
		}

	}
}
