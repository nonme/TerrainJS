"use strict"

let TerrainJS = {};

TerrainJS.SCALE_FACTOR = 1;

TerrainJS.TILE_WIDTH = 32;
TerrainJS.TILE_HEIGHT = 48;

TerrainJS.Init = function() {
    TerrainJS.variable = 1;
};

TerrainJS.Restart = function() {
    TerrainJS.Init();
};

TerrainJS.Boot = function() {
    TerrainJS.Init();
};

TerrainJS.Boot.prototype = {
    preload: function() {
        // this.load.bitmapFont("font", "assets/font/qwerty.png", "assets/font/qwerty.fnt");
    },

    create: function() {
        this.world.scale.set(TerrainJS.SCALE_FACTOR);
        this.state.start("Game");
    }
}