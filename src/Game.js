"use strict"

TerrainJS.Game = function(game) {
    this.level;
}

TerrainJS.Game.prototype = {
    preload: function() {
        // this.game.load.audio("Name", "assets/music/qwerty.mp3");

    },

    create: function() {
        this.game.sound.stopAll();

        //this.level = new Terrain.LevelBuilder(this.game, this).buildFromJSON(json);
    },

    update: function() {
        
    }
}