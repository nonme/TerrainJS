"use strict";

TerrainJS.Tile = function (id, tileX, tileY, key, animKey = key) {
  this.x = tileX;
  this.y = tileY;

  this.id = id;

  this.sprite;

  this.spriteName = key;
}; 

TerrainJS.Tile.prototype.constructor = TerrainJS.Tile;
