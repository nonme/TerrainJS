"use strict";

TerrainJS.World = function (scene, name = "") {
  this.scene = scene;
  this.name = name;

  this.world = [];
};

TerrainJS.World.TILE_OCEAN = 0;
TerrainJS.World.TILE_SEA = 1;
TerrainJS.World.TILE_MOUNTAINS = 2;
TerrainJS.World.TILE_VULCANO = 3;

TerrainJS.World.TILE_GRASS_PLAINS = 10;
TerrainJS.World.TILE_GRASS_FOREST = 11;
TerrainJS.World.TILE_GRASS_HUGE_FOREST = 12;
TerrainJS.World.TILE_GRASS_HILLS = 13;
TerrainJS.World.TILE_GRASS_TUNDRA = 14;
TerrainJS.World.TILE_GRASS_LAKE = 15;

TerrainJS.World.prototype = {
  addTile: function (x, y, id, type) {
    if (x >= 0 && y >= 0) {
      let tile = new TerrainJS.Tile(id, x, y, type);

      let tileX = x * TerrainJS.TILE_WIDTH - (x * TerrainJS.TILE_WIDTH / 4);
      let tileY = y * 28 - (x % 2 == 0 ? 0 : 28 / 2);
      let sprite = this.scene.add.sprite(tileX, tileY, "tiles", type);
      sprite.depth = tileY + 100 * !this.isWater(type); // to do
      tile.sprite = sprite; 
      this.world.push(tile);
    }
  },
  isWater: function(type) {
    return type == TerrainJS.World.TILE_OCEAN || type == TerrainJS.World.TILE_SEA;
  }
};
