"use strict"

TerrainJS.WorldBuilder = function(game) {
    this.game = game;

    this.width;
    this.height;

    this.seed;
    this.world;
}

TerrainJS.WorldBuilder.prototype = {
    buildFromJSON: function(json) {
        this.width = json.size.width;
        //this.
    }
}