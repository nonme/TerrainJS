import AbstractBuilder from "../Builder";

var Noise = require("noisejs");

function SimplexTerrainBuilder(width, height) {
  AbstractBuilder.call(this, width, height);
  this.config = {
    frequency: 3,
    waterLevel: 0.2,
    amplitude: 1,
    octaves: 1,
    trim: true,
  };
}

Object.setPrototypeOf(
  SimplexTerrainBuilder.prototype,
  AbstractBuilder.prototype
);

SimplexTerrainBuilder.prototype.get = function () {
  let noise = new Noise.Noise(this.seed);
  let elevations = [];

  for (let y = 0; y < this.height; ++y) {
    elevations[y] = [];
    for (let x = 0; x < this.width; ++x) {
      let nx = x / this.width - 0.5;
      let ny = y / this.height - 0.5;

      let elevation = 0;
      let currentFrequency = this.config.frequency;
      let currentAmplitude = 1;
      let sumOfAmplitudes = 0;

      for (let octave = 0; octave < this.config.octaves; ++octave) {
        noise = new Noise.Noise(this.seed + octave);

        elevation +=
          currentAmplitude *
          noise.simplex2(currentFrequency * nx, currentFrequency * ny);

        sumOfAmplitudes += currentAmplitude;
        currentFrequency *= 2;
        currentAmplitude /= 2;
      }
      elevation = this.config.amplitude * (elevation / sumOfAmplitudes);

      if (
        this.config.trim &&
        (y == 0 || y == this.height - 1 || x == 0 || x == this.width - 1)
      )
        elevation = Math.max(-1, elevation - 0.5);

      elevations[y][x] = elevation;
    }
  }
  return elevations;
};

export default SimplexTerrainBuilder;
