import AbstractBuilder from "../Builder";
import { calculateNoise } from "../../utils/utils";

function WaterlevelTerrainBuilder(width, height) {
  AbstractBuilder.call(this, width, height);

  this.config = {
    frequency: 3,
    waterLevel: 0.6,
    amplitude: 1,
    octaves: 1,
    elevations: {
      frequency: 8,
      amplitude: 1,
      octaves: 1,
      trim: false,
    },
    trim: true,
  };
}

Object.setPrototypeOf(
  WaterlevelTerrainBuilder.prototype,
  AbstractBuilder.prototype
);

WaterlevelTerrainBuilder.prototype.get = function () {
  let baseLayer = calculateNoise(this.width, this.height, this.config, this.seed);
  let elevations = calculateNoise(
    this.width,
    this.height,
    this.config.elevations,
    this.seed
  );
  for (let y = 0; y < this.height; ++y) {
    for (let x = 0; x < this.width; ++x) {
      if (baseLayer[y][x] <= this.config.waterLevel) {
        elevations[y][x] = baseLayer[y][x];
      }
      if (
        baseLayer[y][x] > this.config.waterLevel &&
        elevations[y][x] <= this.config.waterLevel
      ) {
        elevations[y][x] = baseLayer[y][x];
      }
    }
  }
  return elevations;
};

export default WaterlevelTerrainBuilder;
