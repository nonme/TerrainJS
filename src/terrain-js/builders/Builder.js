import { updateDictionary } from "../utils/utils";

function AbstractBuilder(width, height) {
  this.seed = Math.random();
  this.width = width;
  this.height = height;
  this.config = {};
}

AbstractBuilder.prototype.reseed = function (newSeed = Math.random()) {
  this.seed = newSeed;
  return this;
};

AbstractBuilder.prototype.updateConfig = function (newConfig) {
  updateDictionary(this.config, newConfig);
  return this;
};

AbstractBuilder.prototype.get = function () {};

export default AbstractBuilder;