/**
 * 
 * @constructor
 */
function SR_Slime(x, y) {
	SR_Base.prototype.constructor.call(this, x, y);

	this.gfx = gVars.textures.slime;
	this.tile = gVars.token.SLIME;

	this.anim = sgx.graphics.AnimationManager.get().createState();
	this.anim.setAnimationDataSet(gVars.animations.slime);
	this.anim.startSequence("pulse");

	this.growSpeed = 4;
	this.timeUntilGrow = this.growSpeed;
}
Inheritance_Manager.extend(SR_Slime, SR_Base);

SR_Slime.prototype.update = function(telaps)
{
	SR_Base.prototype.update.call(this, telaps);

	this.timeUntilGrow -= telaps;
	if (this.timeUntilGrow < 0) {
		this.timeUntilGrow = this.growSpeed;
		gVars.currentLevel.addSlimeNear(this.x, this.y);
	}
}

SR_Slime.prototype.getCollisions = function(collisionData, rc) 	{ 
	if (this.hasCollided(rc)) {
		collisionData.immovable = true;
		collisionData.isSpace = false;
	}
}
