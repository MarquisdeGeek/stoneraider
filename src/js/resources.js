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

var gResources = {};

gResources.mini = {};
gResources.mini.musicOff = 3;
gResources.mini.musicOn = 0;
gResources.mini.sfxOff = 9;
gResources.mini.sfxOn = 6;

var audioDataset = {

	"startgame" :    {"group": "sfx" },
	 
	"digearth" :        {"group": "sfx" },
	"rockland" :        {"group": "sfx" },
	"rockfall" :        {"group": "sfx" },
	"gotdiamond" :        {"group": "sfx" },
	"exit_unlocked" :        {"group": "sfx" },
	"endgame" :     {"group": "sfx" },

	"click" :        {"group": "ui" },
	"bing" :         {"group": "ui" },

	"p1" :           {"group": "titlefx" },
	"p2" :           {"group": "titlefx" },
	"p4" :           {"group": "titlefx" },
	// 
	"mainmenu" :     {"group": "music" },
	"ingame" :       {"group": "music" },
};

var audioGroups = {
	"music"   : {"factor": 0.5 },
	"vox"     : {"factor": 0.9 },
	"player"  : {"factor": 0.8 },
	"titlefx" : {"factor": 0.7 },
	"sfx"     : {"factor": 0.8},
	"ui"      : {"factor": 0.7 }
};


gResources.prepareFonts = function() {

	sgx.graphics.FontManager.get().registerFont('std', null, new sgx.graphics.FontParameters(sgx.graphics.FontParameters.eFontTypeNatural, 12, 'Arial'));
	sgx.graphics.FontManager.get().registerFont('ui', 'resources/fonts/std');

	gResources.createStoneRaiderFont();

	sgx.gui.Engine.get().setDefaultFont('std');	// the default is a system font and therefore will contain all the letters
}

gResources.createStoneRaiderFont = function() {
	var param = { m_iFontSize:8, m_iFontType: CSGXFontParams.eFontTypeMultipleTexture };
	var fnt = sgx.graphics.FontManager.get().registerFont('prose', "", param);

	for(var i=0;i<96;++i) {
		fnt.textureList[sgxToCharacter(i+32)] = gResources.createtexture(8, 8, fontdata, i*8);
	}

	// set lower case to match upper case
	for(var i=0;i<26;++i) {
		fnt.textureList[sgxToCharacter(i+97)] = fnt.textureList[sgxToCharacter(i+65)];	
	}

	return fnt;
}

gResources.createtexture = function(width, height, data, offset) {
	var texture = sgx.graphics.TextureManager.get().create("", width, height);
	var imageData = [];
	texture.lock(imageData);
	var bitmap = imageData.pBitmap_;

	var bit = 0;
	var shift = 7;
	var xpos = 0;
	var pi = 0;

	var idx = offset - 1;
	for(var i=0;i<width*height;++i) {
		bit >>= 1;
		if (bit == 0) {
			bit = 0x80;
			++idx;
		}

		var isset = (data[idx] & bit) ? 1 : 0;

		bitmap[pi + 0] = bitmap[pi + 1] = bitmap[pi + 2] = bitmap[pi + 3] = isset?0xff:0;
		pi += 4;
	}

	texture.unlock(imageData);

	texture.clearRegions();
	texture.addPixelRegion(0,0,width,height);

	return texture;
}

gResources.prepareAudio = function() {

	for(var groupName in audioGroups) {
		sgx.audio.Engine.get().assignNormalizationGroup(groupName, audioGroups[groupName].factor);
	}

	var sample;
	for(var sampleName in audioDataset) {
		sample = sgx.audio.Engine.get().registerGlobalSound('resources/audio/' + audioDataset[sampleName].group + '/' + sampleName, audioDataset[sampleName].count);
		sample.setNormalizationGroup(audioDataset[sampleName].group);
	}

	sgx.audio.Engine.get().setMasterVolume(0.7);
}

gResources.loadAssets = function() {

	// General textures. Used in menus and game.
	
	// Game textures
	gVars.textures.gameOver = sgx.graphics.TextureManager.get().registerScenarioTexture("resources/sprites/gameover");

	gVars.textures.level_intro = sgx.graphics.TextureManager.get().registerScenarioTexture("resources/bg/level_intro");
	gVars.textures.game = sgx.graphics.TextureManager.get().registerScenarioTexture("resources/bg/game");
	gVars.textures.blackground = sgx.graphics.TextureManager.get().registerScenarioTexture("resources/bg/blackground");

	// Animations
	gVars.animations.monster = sgx.graphics.AnimationManager.get().loadData("resources/anim/monster");
	gVars.animations.alien = sgx.graphics.AnimationManager.get().loadData("resources/anim/alien");	
	gVars.animations.player = sgx.graphics.AnimationManager.get().loadData("resources/anim/player");
	gVars.animations.exit = sgx.graphics.AnimationManager.get().loadData("resources/anim/exit");
	gVars.animations.slime = sgx.graphics.AnimationManager.get().loadData("resources/anim/slime");

	gVars.textures.blank = sgx.graphics.TextureManager.get().registerScenarioTexture("resources/sprites/blank");
	gVars.textures.diamond = sgx.graphics.TextureManager.get().registerScenarioTexture("resources/sprites/diamond");
	gVars.textures.earth = sgx.graphics.TextureManager.get().registerScenarioTexture("resources/sprites/earth");
	gVars.textures.edge = sgx.graphics.TextureManager.get().registerScenarioTexture("resources/sprites/edge");
	gVars.textures.player = sgx.graphics.TextureManager.get().registerScenarioTexture("resources/sprites/player");
	gVars.textures.rock = sgx.graphics.TextureManager.get().registerScenarioTexture("resources/sprites/rock");
	gVars.textures.wall = sgx.graphics.TextureManager.get().registerScenarioTexture("resources/sprites/wall");
	gVars.textures.monster = sgx.graphics.TextureManager.get().registerScenarioTexture("resources/sprites/monster");
	gVars.textures.exit = sgx.graphics.TextureManager.get().registerScenarioTexture("resources/sprites/exit");
	gVars.textures.alien = sgx.graphics.TextureManager.get().registerScenarioTexture("resources/sprites/alien");
	gVars.textures.slime = sgx.graphics.TextureManager.get().registerScenarioTexture("resources/sprites/slime");

	gVars.token.EXIT = '$';
	gVars.token.EXIT_HIDDEN = '!';
	gVars.token.WALL = 'x';
	gVars.token.EDGE = '#';
	gVars.token.ROCK = 'o';
	gVars.token.PLAYER = 'p';
	gVars.token.EARTH = '.';
	gVars.token.SPACE = ' ';
	gVars.token.DIAMOND = '*';
	gVars.token.MONSTER_SKULL = 'M';
	gVars.token.MONSTER_ALIEN = 'A';
	gVars.token.SLIME = 's';
}
