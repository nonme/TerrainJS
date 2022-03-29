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
  },

  create: function () {
    //this.game.sound.stopAll();
    let json = this.cache.json.get("simple");
    if (!json) {
      alert("Couldn't load json");
      return;
    }
    this.level = new TerrainJS.WorldBuilder(this).buildFromJSON(json);
  },

  update: function () {},
};
