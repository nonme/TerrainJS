"use strict";

TerrainJS.World = function(game) {
    this.game = game;
};

TerrainJS.World.TILE_OCEAN = 0;
TerrainJS.World.TILE_SEA   = 1;
TerrainJS.World.TILE_MOUNTAINS = 2;
TerrainJS.World.TILE_VULCANO = 3;

TerrainJS.World.TILE_GRASS_PLAINS = 10;
TerrainJS.World.TILE_GRASS_FOREST = 11;
TerrainJS.World.TILE_GRASS_HUGE_FOREST = 12;
TerrainJS.World.TILE_GRASS_HILLS = 13;
TerrainJS.World.TILE_GRASS_TUNDRA = 14;
TerrainJS.World.TILE_GRASS_LAKE = 15;