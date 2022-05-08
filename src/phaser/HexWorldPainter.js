import spritesheet from "../assets/sprites/spritesheet.png";
import spritesheetJson from "../assets/sprites/spritesheet.json";

import rivers from "../assets/sprites/rivers.png";
import riversJson from "../assets/sprites/rivers.json";

import TagsTree from "./TagsTree";

const TILE_WIDTH = 32;
const TILE_HEIGHT = 48;
const TILE_REAL_HEIGHT = 30;
const TILE_DISTANCE = 2;

function HexWorldPainter(scene) {
  this.scene = scene;

  this.scene.load.atlas("tiles", spritesheet, spritesheetJson);
  this.scene.load.atlas("rivers", rivers, riversJson);

  this.sprites = [];
}

HexWorldPainter.prototype.initialize = function (tagsInfo) {
  this.spriteManager = new TagsTree(
    this.scene.textures.get("tiles").getFrameNames()
  );
  this.spriteManager
    .addTags(tagsInfo.elevation.tags)
    .addTags(tagsInfo.temperature.tags)
    .addTags(tagsInfo.moisture.tags)
    .build();
};

HexWorldPainter.prototype.getSpriteKey = function (tags) {
  return this.spriteManager.get(tags);
};

HexWorldPainter.prototype.clear = function () {
  this.sprites.forEach((sprite) => sprite.destroy());
  this.sprites = [];
};
HexWorldPainter.prototype.draw = function (world) {
  this.clear();

  let calculateSpriteDepth = (tile) =>
    tile.getY() -
    (tile.getX() % 2) +
    world.getWidth() * world.getHeight() * !tile.isWater();

  for (let y = 0; y < world.getHeight(); ++y) {
    for (let x = 0; x < world.getWidth(); ++x) {
      let tile = world.getTileAt(x, y);

      let tileX = tile.getX() * TILE_WIDTH - (tile.getX() * TILE_WIDTH) / 4;
      let tileY =
        tile.getY() * (TILE_REAL_HEIGHT - TILE_DISTANCE) -
        (tile.getX() % 2 == 0 ? 0 : (TILE_REAL_HEIGHT - TILE_DISTANCE) / 2);

      let spriteKey = this.spriteManager.get(tile.getTags());
      let sprite = this.scene.add.sprite(tileX, tileY, "tiles", spriteKey);
      sprite.depth = calculateSpriteDepth(tile);

      if (tile.hasAttribute("river")) {
        let riverKey = this.getRiverKey(tile, world);
        if (riverKey.length > 2) riverKey = riverKey[0] + riverKey[1];
        if (
          this.scene.textures.get("rivers").has(riverKey) &&
          !tile.hasTag("mountains") &&
          !tile.hasTag("ocean") &&
          !tile.hasTag("sea") &&
          !(tile.hasTag("superhumid") && !tile.hasTag("hot")) &&
          !tile.hasTag("hills")
        ) {
          let river = this.scene.add.sprite(tileX, tileY, "rivers", riverKey);
          river.depth = calculateSpriteDepth(tile);
          this.sprites.push(river);
        }
      }

      this.sprites.push(sprite);
    }
  }
};
HexWorldPainter.prototype.getRiverKey = function (tile, world) {
  let i = 1;
  let id = tile.getAttributeInfo("river").id;
  let localId = tile.getAttributeInfo("river").localId;
  let key = "";
  for (let neighbour of world.getNeighbours(tile)) {
    if (neighbour !== undefined) {
      if (
        neighbour.hasAttribute("river") &&
        neighbour.getAttributeInfo("river").id == id &&
        Math.abs(neighbour.getAttributeInfo("river").localId - localId) == 1
      ) {
        key += i;
      }
    }
    i++;
  }
  if (key.length == 1) {
    i = 1;
    for (let neighbour of world.getNeighbours(tile)) {
      if (
        neighbour !== undefined &&
        (neighbour.isWater() || neighbour.hasTag("mountains"))
      ) {
        key += i;
        break;
      }
      i++;
    }
  }
  if (key.length == 2 && key[0] > key[1]) {
    key = key[1] + key[0];
  }
  return key;
};

export default HexWorldPainter;
