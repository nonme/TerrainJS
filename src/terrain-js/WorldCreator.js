"use strict";

import HexWorld from "./world/hex/HexWorld";
import updateDictionary from "./utils/utils";
import SimplexTerrainbuilder from "./builders/elevation/SimplexTerrainBuilder.js";
import SimplexMoisurebuilder from "./builders/moisure/SimplexMoisureBuilder.js";
import LattitudeClimatebuilder from "./builders/temperature/LattitudeClimateBuilder";
import RiversBuilder from "./builders/road/RiversBuilder";
import WaterlevelTerrainBuilder from "./builders/elevation/WaterlevelTerrainBuilder";

/**
 * WorldCreator is a build_er class that produces World objects using elevation, moisure, temperature etc.
 * @constructor
 */
function WorldCreator(width = 40, height = 30, tagsInfo) {
  this.width = width;
  this.height = height;
  this.tagsInfo = tagsInfo;

  this.build_ = {};

  this.build_["terrain"] = new WaterlevelTerrainBuilder(width, height);
  this.terrain = this.build_.terrain.get();

  this.build_["moisure"] = new SimplexMoisurebuilder(width, height);
  this.moisure = this.build_.moisure.get();

  this.build_["temperature"] = new LattitudeClimatebuilder(width, height);
  this.temperature = this.build_.temperature.get();

  let elevationTags = this.tagsInfo.elevation.tags;
  let moistureTags = this.tagsInfo.moisture.tags;
  this.build_["rivers"] = new RiversBuilder(
    [elevationTags[elevationTags.length - 1]],
    [elevationTags[1]]
  );

  this.build_["moisture_temp"] = (world) => {
    for (let y = 0; y < world.getHeight(); ++y) {
      for (let x = 0; x < world.getWidth(); ++x) {
        let tile = world.getTileAt(x, y);
        if (
          tile.getTags().includes("desert") &&
          tile.getTags().includes("superhumid")
        ) {
          tile.replaceTag("desert", "hot");
          tile.replaceTag("superhumid", "humid");
        }
        if (tile.getAttributes().includes("river")) {
          console.log("river");
        }
      }
    }
  };

  this.build_["coastals"] = (world) => {
    for (let y = 0; y < world.getHeight(); ++y) {
      for (let x = 0; x < world.getWidth(); ++x) {
        let tile = world.getTileAt(x, y);
        if (!tile.isWater()) {
          console.log(tile.getTags(), tile.isWater());
          for (let neighbour of world.getNeighbours(tile)) {
            if (neighbour !== undefined && neighbour.hasTag("ocean")) {
              neighbour.replaceTag("ocean", "sea");
            }
          }
        }
      }
    }
  };
}

WorldCreator.prototype.setElevationOptions = function (config) {
  this.build_.terrain.updateConfig(config);
  return this;
};
WorldCreator.prototype.setMoisureOptions = function (config) {
  this.build_.moisure.updateConfig(config);
  return this;
};
WorldCreator.prototype.setTemperatureOptions = function (config) {
  this.build_.temperature.updateConfig(config);
  return this;
};
WorldCreator.prototype.updateWorld = function (config) {
  updateDictionary(config);
  return this;
};
WorldCreator.prototype.reseed = function () {
  this.build_.terrain.reseed();
  this.build_.moisure.reseed();
  this.build_.temperature.reseed();
  return this;
}

WorldCreator.prototype.update = function () {};

WorldCreator.prototype.build = function () {
  const world = new HexWorld(this.width, this.height);

  let elevations = this.build_.terrain.get();
  let moisures = this.build_.moisure.get();
  let temperatures = this.build_.temperature.get();

  for (let y = 0; y < this.height; ++y) {
    for (let x = 0; x < this.width; ++x) {
      let elevationTag = this.selectTag_(
        elevations[y][x],
        this.tagsInfo.elevation.thresholds,
        this.tagsInfo.elevation.tags
      );

      let temperatureTag = this.selectTag_(
        temperatures[y][x],
        this.tagsInfo.temperature.thresholds,
        this.tagsInfo.temperature.tags
      );

      let moisureTag = this.selectTag_(
        moisures[y][x],
        this.tagsInfo.moisture.thresholds,
        this.tagsInfo.moisture.tags
      );

      world.setTile(x, y, [elevationTag, temperatureTag, moisureTag]);
    }
  }

  this.build_.moisture_temp(world);
  this.build_.coastals(world);
  this.build_.rivers.apply(world, elevations);

  return world;
};

WorldCreator.prototype.selectTag_ = function (value, values, tags) {
  let tag = tags[0];
  for (let i = 0; i < values.length; ++i) {
    if (value >= values[i]) tag = tags[i];
  }
  return tag;
};

export default WorldCreator;
