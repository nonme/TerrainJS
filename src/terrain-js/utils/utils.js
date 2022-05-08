/**
 * Update keys of a dictionary with values from other dictionary
 */
export function updateDictionary(a, b) {
  for (const key in b) {
    a[key] = b[key];
  }
}

var Noise = require("noisejs");

export function calculateNoise(width, height, config, seed = Math.random()) {
  let noise = new Noise.Noise(seed);
  let elevations = [];

  for (let y = 0; y < height; ++y) {
    elevations[y] = [];
    for (let x = 0; x < width; ++x) {
      let nx = x / width - 0.5;
      let ny = y / height - 0.5;

      let elevation = 0;
      let currentFrequency = config.frequency;
      let currentAmplitude = 1;
      let sumOfAmplitudes = 0;
      for (let octave = 0; octave < config.octaves; ++octave) {
        elevation +=
          (currentAmplitude *
            (noise.simplex2(currentFrequency * nx, currentFrequency * ny) +
              1)) /
          2;

        sumOfAmplitudes += currentAmplitude;
        currentFrequency *= 2;
        currentAmplitude /= 2;

        noise = new Noise.Noise(seed + octave);
      }
      elevation = config.amplitude * (elevation / sumOfAmplitudes);

      elevations[y][x] = elevation;
    }
  }
  return elevations;
}