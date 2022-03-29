"use strict";

function Tile(id, tileX, tileY, key, animKey = key) {
  this.x = tileX;
  this.y = tileY;

  this.id = id;

  this.sprite;

  this.spriteName = key;
}; 

Tile.prototype = {};
Tile.prototype.constructor = Tile;

export default Tile;