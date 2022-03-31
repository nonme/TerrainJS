var Noise = require("noisejs");

let NoiseGen = {
  Perlin: function (
    width,
    height,
    config = { frequency: 5, amplitude: 1, octaves: 1, trim: true },
    seed = Math.random()
  ) {
    let noise = new Noise.Noise(seed);
    let result = [];

    for (let y = 0; y < height; ++y) {
      result[y] = [];
      for (let x = 0; x < width; ++x) {
        let nx = x / width;
        let ny = y / height;

        let elevation = 0;
        let currentFrequency = config.frequency;
        let currentAmplitude = config.amplitude;
        let sumOfAmplitudes = 0;
        for (let octave = 0; octave < config.octaves; ++octave) {
          elevation +=
            currentAmplitude *
            noise.perlin2(currentFrequency * nx, currentFrequency * ny);

          sumOfAmplitudes += currentAmplitude;
          currentFrequency *= 2;
          currentAmplitude /= 2;
        }
        elevation = (Math.min(1, elevation) + 1) / 1.8;

        if (
          config.trim &&
          (x == 0 || y == 0 || x == width - 1 || y == height - 1)
        )
          elevation = -1;
        result[y][x] = elevation;
      }
    }
    return result;
  },
};

export default NoiseGen;
