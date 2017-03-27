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

function SR_DynamicManager(){}
SR_DynamicManager.create = function(type, x, y) {
	switch(type) {
		case gVars.token.PLAYER:
		return new SR_Player(x, y);

		case gVars.token.MONSTER:
		return new SR_Monster(x, y);

		case gVars.token.ROCK:
		return new SR_Rock(x, y);

		case gVars.token.EARTH:
		return new SR_Earth(x, y);

		case gVars.token.EDGE:
		return new SR_Edge(x, y);

		case gVars.token.EXIT:
		return new SR_Exit(x, y);

		case gVars.token.DIAMOND:
		return new SR_Diamond(x, y);

		case gVars.token.WALL:
		return new SR_Wall(x, y);

		case gVars.token.SPACE:
		return new SR_Blank(x, y);

		default:
		sgxTrace("No tile type:" + type);
		return new SR_Base();
	}
}



/**
 * 
 * @constructor
 */
function GameLevel(idx) {
var levelIndex;
//
var diamonds;
var m_fTimecum;
//

	(function ctor() {
		newLevel(idx);
	})();

	function newLevel(index) {	

		var map_data = gLevels[index];
		var dimensions = getLevelDimensions();

		mapJSW = new Array();
		mapIndexed = new Array();

		diamonds = 0;

		for(var y=0;y<dimensions.height;++y) {
			for(var x=0;x<dimensions.width;++x) {
				var idx = x + y*dimensions.width;
				var obj = SR_DynamicManager.create(map_data[idx], x*gVars.tilesize, y*gVars.tilesize);

				mapJSW.push(obj);
				addGameObject(obj, obj.x, obj.y);
				//
				switch(obj.tile) {
					case gVars.token.PLAYER:
					gVars.playerData.setSRObject(obj);
					break;
					case gVars.token.DIAMOND:
					++diamonds;
					break;
				}
			}
		}

		m_fTimecum = 0;

		levelIndex = index;
	}

	function getDiamondCount() {
		return diamonds;
	}

	function unlockExit() {
		for(var i=0;i<mapJSW.length;++i) {
			if (mapJSW[i].tile == gVars.token.EXIT) {
				mapJSW[i].unlock();
			}				
		}
	}

	function killObjectByRockAt(idx) {
		// @todo
		mapIndexed[idx].killByRock();
	}

	function getLevelDimensions() {
		return {width:40, height:25};
	}

	function drawBackground(surface, viewportRect) {

		surface.setClipRect();
		surface.setFillTexture(gVars.textures.game);		
		surface.setFillColor(sgxColorRGBA.White);
		surface.fillRect();
	}

	function draw(surface, viewportRect) {
		drawBackground(surface, viewportRect);
		//
		var screenWidth = surface.getWidth();
		var screenHeight = surface.getHeight();
		var dimensions = getLevelDimensions();

		surface.setClipRect(0,gVars.tilesize, screenWidth, screenHeight);
		
		for(var i=0;i<mapIndexed.length;++i) {
			if (mapIndexed[i]) {
				mapIndexed[i].draw(surface, viewportRect);
			}				
		}

		surface.setClipRect();
	}

	function postDraw(surface, viewportRect) {
	}

	function getCollisions(xpos, ypos) {
		var rc = new sgxRect2f(xpos, ypos, gVars.tilesize, gVars.tilesize);
		var collisionData = { isSpace: true, immovable: false, consumed: false, 
			endlevel: false, 
			rockObject: undefined, playerObject: undefined,
			diamondList:[], monsterList:[], objects:[]};

		var t1 = getTileIndexOf(xpos, ypos);
		var t2 = getTileIndexOf(xpos + gVars.tilesize-1, ypos);
		var t3 = getTileIndexOf(xpos, ypos + gVars.tilesize-1);
		var t4 = getTileIndexOf(xpos + gVars.tilesize-1, ypos + gVars.tilesize-1);

		if (t1 != undefined && mapIndexed[t1]) {
			mapIndexed[t1].getCollisions(collisionData, rc);
		}

		if (t2 != undefined && mapIndexed[t2] && t2 != t1) {
			mapIndexed[t2].getCollisions(collisionData, rc);
		}

		if (t3 != undefined && mapIndexed[t3] && t3 != t1 && t3 != t2) {
			mapIndexed[t3].getCollisions(collisionData, rc);
		}

		if (t4 != undefined && mapIndexed[t4] && t4 != t1 && t4 != t2 && t4 != t3) {
			mapIndexed[t4].getCollisions(collisionData, rc);
		}

		return collisionData;
	}

	function addGameObject(srobj, x, y)		{ 
		var index = getTileIndexOf(x, y);

		mapIndexed[index] = srobj;
		srobj.index = index;

		srobj.x = x;
		srobj.y = y;
	}

	function moveGameObject(srobj, x, y)		{ 
		removeGameObject(srobj);
		addGameObject(srobj, x, y);
	}

	function removeGameObject(srobj)		{ 
		var index = getTileIndexOf(srobj.x, srobj.y);
		removeGameObjectAt(index);
	}

	function removeGameObjectAt(index)		{ 
		if (index >= 0 && index < mapIndexed.length && mapIndexed[index]) {
			mapIndexed[index].index = undefined;
			mapIndexed[index] = undefined;
		}
	}


	function getTileAt(idx) {
		return mapIndexed[idx] ? mapIndexed[idx].tile : ' ';
	}

	function getObjectAt(xpos, ypos) {
		var index = getTileIndexOf(xpos, ypos);
		return mapIndexed[index];
	}

	function getTileIndexOf(x, y) {
		var dimensions = getLevelDimensions();
		var index = sgxFloor(x/gVars.tilesize) + sgxFloor(y/gVars.tilesize) * dimensions.width;
		if (index < 0 && index >= mapIndexed.length) {
			return undefined;
		}
		return index;
	}
	

	function update(surface, telaps) {
		m_fTimecum += telaps;
		if (m_fTimecum < 2) {
			return;
		}
		// Work backwards, because the rocks nearest the bottom of the screen
		// are at the end of the list. This allows the lower rocks to fall first,
		// followed by the ones above.
		for(var i=mapIndexed.length-1;i>=0;--i) {
			if (mapIndexed[i])
				mapIndexed[i].update(telaps);
		}

		for(var i=mapIndexed.length-1;i>=0;--i) {
			if (mapIndexed[i])
				mapIndexed[i].updateGravity(telaps);
		}

	}
	
	return {
		newLevel: function() 						{ return newLevel(); },
		getLevel: function() 						{ return levelIndex; },
		getLevelDimensions: function() 				{ return getLevelDimensions(); },

		update: function(surface, telaps) 			{ return update(surface, telaps); },
		draw: function(surface, viewportRect) 		{ return draw(surface, viewportRect); },
		postDraw: function(surface, viewportRect)	{ return postDraw(surface, viewportRect); },

		addGameObject: function(srobj, x, y)		{ return addGameObject(srobj, x, y); },
		moveGameObject: function(srobj, x, y)		{ return moveGameObject(srobj, x, y); },
		removeGameObject: function(srobj)			{ return removeGameObject(srobj); },
		removeGameObjectAt: function(idx)			{ return removeGameObjectAt(idx); },

		getDiamondCount: function() 				{ return getDiamondCount(); },
		unlockExit: function() 						{ return unlockExit(); },
		killObjectByRockAt: function(idx) 			{ return killObjectByRockAt(idx); },

		getTileAt: function(idx)					{ return getTileAt(idx); },
		getObjectAt: function(x,y)					{ return getObjectAt(x,y); },
		getTileIndexOf: function(x,y)				{ return getTileIndexOf(x,y); },
		getCollisions: function(playerWall, rc)		{ return getCollisions(playerWall, rc); },
		getHaliteTotals: function() 				{ return 0; }
	};
}
