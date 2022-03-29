"use strict";

TerrainJS.WorldBuilder = function (scene) {
  this.scene = scene;

  this.width;
  this.height;

  this.seed;
  this.world;
};

TerrainJS.WorldBuilder.prototype = {
  buildFromJSON: function (json) {
    this.width = json.size.width;
    this.height = json.size.height;

    this.world = new TerrainJS.World(this.scene, json.name);
    console.log(this.width, this.height);
    for (let y = 0; y < this.height; ++y) {
      for (let x = 0; x < this.width; ++x) {
          console.log(x + " " + y);
        let id = json.level[y][x].id;
        let type = json.level[y][x].type;
        let tileX = x;
        let tileY = y;

        this.world.addTile(tileX, tileY, id, type);
      }
    }

    return this.world;
  },
};
