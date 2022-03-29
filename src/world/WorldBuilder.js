"use strict";

TerrainJS.WorldBuilder = function (scene) {
  this.scene = scene;

  this.width;
  this.height;

  this.seed;
  this.world;

  this.noise = new Noise(Math.random());
};

TerrainJS.WorldBuilder.prototype = {
  buildFromJSON: function (json) {
    this.width = json.size.width;
    this.height = json.size.height;

    this.world = new TerrainJS.World(this.scene, json.name);
    for (let y = 0; y < this.height; ++y) {
      for (let x = 0; x < this.width; ++x) {
        let id = json.level[y][x].id;
        let type = json.level[y][x].type;

        this.world.addTile(x, y, id, type);
      }
    }

    return this.world;
  },
  createPerlin: function (
    width,
    height,
    config = { frequency: 5, trim: true }
  ) {
    let result = [];

    for (let y = 0; y < height; ++y) {
      result[y] = [];
      for (let x = 0; x < width; ++x) {
        let nx = x / width,
          ny = y / height;

        let elevation =
          this.noise.perlin2(config.frequency * nx, config.frequency * ny) +
          0.5;
        if (config.trim && (x == 0 || y == 0 || x == width - 1 || y == height - 1)) elevation = 0;

        result[y][x] = elevation;
      }
    }
    return result;
  },
  createIceland: function (
    width,
    height,
    config = {
      algorithm: "perlin",
      frequency: 8,
      trim: true,
    }
  ) {
    let algorithm = this.getAlgorithm(config.algorithm);
    let minElev = 100,
      maxElev = -100;
    let result = [];
    for (let y = 0; y < height; ++y) {
      result[y] = [];
      for (let x = 0; x < width; ++x) {
        let nx = x / width - 0.5;
        let ny = y / height - 0.5;

        let e =
          this.noise.perlin2(config.frequency * nx, config.frequency * ny) +
          0.5;
        let d = Math.sqrt(nx * nx + ny * ny) / Math.sqrt(0.5);

        let elevation = (1 + e - d) / 2;
        console.log(e, d, elevation);
        minElev = elevation < minElev ? elevation : minElev;
        maxElev = elevation > maxElev ? elevation : maxElev;
        result[y][x] = elevation;
      }
    }
    console.log(minElev, maxElev);
    return result;
  },
  createWorld: function (
    width,
    height,
    elevation = this.createPerlin(width, height)
  ) {
    this.width = width;
    this.height = height;
    this.world = new TerrainJS.World(this.scene, "Test");

    for (let y = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        let type = TerrainJS.World.TILE_OCEAN;
        let id = y * height + x;

        if (elevation[y][x] > 0.95) type = TerrainJS.World.TILE_MOUNTAINS;
        else if (elevation[y][x] > 0.9)
          type = TerrainJS.World.TILE_GRASS_HILLS;
        else if (elevation[y][x] > 0.6)
          type = TerrainJS.World.TILE_GRASS_FOREST;
        else if (elevation[y][x] > 0.5)
          type = TerrainJS.World.TILE_GRASS_PLAINS;

        this.world.addTile(x, y, id, type);
      }
    }

    return this.world;
  },
  getAlgorithm: function (name) {
    if (name == "perlin") return this.noise.perlin2.bind(this);
    else return this.noise.simplex2;
  },
};
