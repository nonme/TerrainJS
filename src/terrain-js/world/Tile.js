"use strict";

function Tile(x, y, tags) {
  this.tags = tags;
  this.attributes = [];
  this.attributeInfo = {};
  this.x = x;
  this.y = y;
}

Tile.prototype.constructor = Tile;
Tile.prototype.getX = function () {
  return this.x;
};
Tile.prototype.getY = function() {
  return this.y;
}
Tile.prototype.isWater = function () {
  return "ocean" in this.tags || "sea" in this.tags;
};
Tile.prototype.addTag = function(tag) {
  this.tags.push(tag);
}
Tile.prototype.hasTag = function(tag) {
  return this.tags.includes(tag);
}
Tile.prototype.hasTags = function(tags) {
  for (let tag of tags) {
    if (!this.hasTag(tag)) return false;
  }
  return true;
}
Tile.prototype.addAttribute = function(attribute, attributeInfo = {}) {
  this.attributes.push(attribute);
  this.attributeInfo[attribute] = attributeInfo;
}
Tile.prototype.hasAttribute = function(attribute) {
  return this.attributes.includes(attribute);
}
Tile.prototype.getTags = function () {
  return this.tags;
};
Tile.prototype.getAttributes = function() {
  return this.attributes;
}
Tile.prototype.getAttributeInfo = function(attribute) {
  return this.attributeInfo[attribute];
}
Tile.prototype.replaceTag = function(tag, newTag) {
  this.tags[this.tags.indexOf(tag)] = newTag;
}

export default Tile;
