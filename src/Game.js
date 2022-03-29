"use strict";

TerrainJS.Game = function () {
  this.level;
};

TerrainJS.Game.prototype = {
  preload: function () {
    // this.game.load.audio("Name", "assets/music/qwerty.mp3");
    this.load.json("simple", "assets/samples/simple.json");
    this.load.atlas(
      "tiles",
      "assets/spritesheet.png",
      "assets/spritesheet.json"
    );
    this.cameras.main.zoomTo(2, 10);
    this.cameras.main.pan(100, 100, 10);
  },

  create: function () {
    //this.game.sound.stopAll();
    let json = this.cache.json.get("simple");
    if (!json) {
      alert("Couldn't load json");
      return;
    }
    this.level = new TerrainJS.WorldBuilder(this).buildFromJSON(json);

    this.input.on("pointermove", function(pointer) {
      if (!pointer.isDown) return;

      this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
      this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
    });

    this.input.on("wheel", function(pointer, go, dx, dy, dz) {
      let zoom = this.cameras.main.zoom - (0.01 * dy);
      if (zoom < 1) zoom = 1;
      this.cameras.main.zoomTo(zoom, 10);
      //this.cameras.main.pan(pointer.x, pointer.y, 10);
      console.log(this.cameras.main.zoom, dy);
    });
  },

  update: function () {},
};
