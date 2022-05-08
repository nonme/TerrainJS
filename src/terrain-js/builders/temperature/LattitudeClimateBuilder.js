import AbstractBuilder from "../Builder";

function LattitudeClimateBuilder(width, height) {
  AbstractBuilder.call(this, width, height);
  this.config = {
    equator: 1,
    poles: -1,
    randomFactor: 0.1,
  };
}

Object.setPrototypeOf(
  LattitudeClimateBuilder.prototype,
  AbstractBuilder.prototype
);

LattitudeClimateBuilder.prototype.get = function () {
  let temperature = [];
  for (let y = 0; y < this.height; ++y) {
    temperature[y] = [];
    for (let x = 0; x < this.width; ++x) {
      let eq = this.config.equator * Math.sin(Math.PI * (y / (this.height - 1)));
      let po =
        this.config.poles *
        (y < this.height / 2
          ? Math.sin(Math.PI / 2 + (Math.PI / 2) * (y / (this.height / 2 - 1)))
          : Math.sin((Math.PI / 2) * ((y - this.height / 2) / (this.height / 2 - 1))));
      let t = eq + po;
      temperature[y][x] = t;
    }
  }
  return temperature;
};

export default LattitudeClimateBuilder;
