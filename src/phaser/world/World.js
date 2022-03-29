"use strict";

import * as Bindings from "./TileBindings";
import {TILE_WIDTH, TILE_HEIGHT, TILE_REAL_HEIGHT, TILE_DISTANCE} from "../config.js";
import Tile from "./../tile/Tile";

function World(scene, name = "") {
  this.scene = scene;
  this.name = name;

  this.world = [];
};

World.prototype = {
  addTile: function (x, y, id, type) {
    if (x >= 0 && y >= 0) {
      let tile = new Tile(id, x, y, type);

      let tileX = x * TILE_WIDTH - (x * TILE_WIDTH / 4);
      let tileY = y * (TILE_REAL_HEIGHT - TILE_DISTANCE) - (x % 2 == 0 ? 0 : (TILE_REAL_HEIGHT - TILE_DISTANCE) / 2);
      let sprite = this.scene.add.sprite(tileX, tileY, "tiles", type);
      sprite.depth = tileY + 100 * !this.isWater(type); // to do
      tile.sprite = sprite; 
      this.world.push(tile);
    }
  },
  isWater: function(type) {
    return type == Bindings.TILE_OCEAN || type == Bindings.TILE_SEA;
  },
  destroy: function() {
    this.world.forEach(tile => tile.sprite.destroy());
  }
};

export default World;