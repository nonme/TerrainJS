import World from "../World";

function HexWorld(width, height) {
  World.call(this, width, height);
  this.neighbours = {};
}

Object.setPrototypeOf(HexWorld.prototype, World.prototype);

HexWorld.prototype.getNeighbours = function (tile) {
  let x = tile.getX();
  let y = tile.getY();
  let neighbours = [];
  neighbours.push(this.getTileAt(x, y - 1));

  let f = x % 2 == 0 ? 0 : -1;
  let s = x % 2 == 0 ? 1 : 0;
  neighbours.push(this.getTileAt(x + 1, y + f));
  neighbours.push(this.getTileAt(x + 1, y + s));
  neighbours.push(this.getTileAt(x, y + 1));
  neighbours.push(this.getTileAt(x - 1, y + s));
  neighbours.push(this.getTileAt(x - 1, y + f));

  return neighbours;
};

export default HexWorld;
