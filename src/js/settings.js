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

function populateSettings(settings) {
	var cmd = new CCommandLine();

	settings.setOption('main.startstate', 'mainmenu');	// usually titles or mainmenu
	settings.setOption('main.fps', cmd.getOptionAsBool(null, 'main.fps', false));
	settings.setOption('game.winch', false);

	var musicOn = sgxLocalStorage.getOptionAsBool("audio.music", true);
	musicOn = cmd.getOptionAsBool(null, 'audio.music', musicOn);
	gui.refresMixerMusic(musicOn);

	var sfxOn = sgxLocalStorage.getOptionAsBool("audio.sfx", true);
	sfxOn = cmd.getOptionAsBool(null, 'audio.sfx', sfxOn);
	gui.refresMixerSFX(sfxOn);
}
