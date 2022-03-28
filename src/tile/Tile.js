"use strict"

const { Phaser } = require("../../lib/phaser")

TerrainJS.Tile = function(game, tileX, tileY, key, animKey = key) {
    Phaser.Sprite.call(this, game, 0, 0, key);

    this.tileX = tileX;
    this.tileY = tileY;

    this.spriteName = key;
}

TerrainJS.Tile.prototype = Object.create(Phaser.Sprite.prototype);
TerrainJS.Tile.prototype.constructor = TerrainJS.Tile;