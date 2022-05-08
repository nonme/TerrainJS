import AbstractBuilder from "../Builder";
import { calculateNoise } from "../../utils/utils";

var Noise = require("noisejs");

function SimplexMoisureBuilder(width, height) {
  AbstractBuilder.call(this, width, height);
  this.config = {
    frequency: 10,
    amplitude: 1.1,
    octaves: 1,
  };
}

Object.setPrototypeOf(
  SimplexMoisureBuilder.prototype,
  AbstractBuilder.prototype
);

SimplexMoisureBuilder.prototype.get = function () {
  return calculateNoise(this.width, this.height, this.config, this.seed);
};

export default SimplexMoisureBuilder;
