"use strict";

import Tile from "./Tile";

function World(width, height) {
  this.width = width;
  this.height = height;

  this.level = {};
}

World.prototype.constructor = World;

World.prototype.setTile = function (x, y, tags) {
  if (!(y in this.level)) this.level[y] = {};
  this.level[y][x] = new Tile(x, y, tags);
};
World.prototype.hasTileAt = function(x, y) {
  return y in this.level && x in this.level[y];
}
World.prototype.getTileAt = function (x, y) {
  if (y in this.level) return this.level[y][x];
  return undefined;
};

World.prototype.getHeight = function () {
  return this.height;
};
World.prototype.getWidth = function () {
  return this.width;
};

export default World;
