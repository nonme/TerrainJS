function RiversBuilder(startingTags, endingTags) {
  this.startingTags = startingTags;
  this.endingTags = endingTags;
}

RiversBuilder.prototype.apply = function (world, elevations) {
  let riverCounter = 0;
  for (let y = 0; y < world.getHeight(); ++y) {
    for (let x = 0; x < world.getWidth(); ++x) {
      let tile = world.getTileAt(x, y);
      let isStarting = true;
      for (let tag of this.startingTags) {
        if (!tile.getTags().includes(tag)) {
          isStarting = false;
          break;
        }
      }

      if (isStarting) {
        this.dfsRiver(tile, world, elevations, riverCounter);
        this.dfsRiver(tile, world, elevations, riverCounter + 1);
        this.dfsRiver(tile, world, elevations, riverCounter + 2);
        riverCounter += 3;
      }
    }
  }
};

RiversBuilder.prototype.dfsRiver = function (
  tile,
  world,
  elevations,
  riverCounter,
  tileCounter = 0
) {
  tile.addAttribute("river", { id: riverCounter, localId: tileCounter });
  if (tile.hasTag("humid")) tile.replaceTag("humid", "arid");

  if (tile.hasTag("sea") || tile.hasTag("ocean")) return;

  let lowest_elevation = 1;
  let lowest_tile = undefined;
  for (let neighbour of world.getNeighbours(tile)) {
    if (neighbour === undefined) continue;
    let e = elevations[neighbour.getY()][neighbour.getX()];
    if (
      neighbour.isWater() ||
      (e < lowest_elevation &&
        !neighbour.getAttributes().includes("river") &&
        !neighbour.hasTag("desert") &&
        (neighbour.hasTag("arid") || neighbour.hasTag("superarid")))
    ) {
      lowest_elevation = e;
      lowest_tile = neighbour;
    }
  }
  if (lowest_tile !== undefined)
    this.dfsRiver(
      lowest_tile,
      world,
      elevations,
      riverCounter,
      tileCounter + 1
    );
  else {
    for (let neighbour of world.getNeighbours(tile)) {
      if (neighbour === undefined) continue;
      let e = elevations[neighbour.getY()][neighbour.getX()];
      if (
        neighbour.isWater() ||
        (e < lowest_elevation &&
          !neighbour.getAttributes().includes("river") &&
          !neighbour.hasTag("desert"))
      ) {
        lowest_elevation = e;
        lowest_tile = neighbour;
      }
    }
    if (lowest_tile !== undefined) {
      this.dfsRiver(
        lowest_tile,
        world,
        elevations,
        riverCounter,
        tileCounter + 1
      );
    }
  }
};

export default RiversBuilder;
