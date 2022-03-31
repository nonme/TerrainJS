"use strict";

import WorldBuilder from "./world/WorldBuilder";
import spritesheet from "./../assets/sprites/spritesheet.png";
import spritesheet_json from "./../assets/sprites/spritesheet.json";
import NoiseGen from "./world/utils/NoiseGen";

function Game() {
  this.level;
}

Game.prototype = {
  restart: function (e) {
    this.scene.restart();
  },
  preload: function () {
    //this.game.load.audio("Name", "assets/music/qwerty.mp3");
    // this.load.json("simple", "./../assets/samples/simple.json");
    this.load.atlas("tiles", spritesheet, spritesheet_json);
    this.cameras.main.zoomTo(2, 10);
    this.cameras.main.pan(100, 100, 10);
    this.seed = Math.random();
  },

  create: function () {
    function restart(e) {
      //this.scene.restart();
      this.level.destroy();

      const data = e.detail;

      this.level = new WorldBuilder(this).createWorld(
        data.width,
        data.height,
        NoiseGen.Perlin(data.width, data.height, {
          frequency: data.frequency,
          amplitude: data.amplitude,
          octaves: data.octaves,
          trim: true
        })
      );
    }
    window.addEventListener("restart", restart.bind(this), false);

    //this.game.sound.stopAll();
    //let json = this.cache.json.get("simple");
    //if (!json) {
    //  alert("Couldn't load json");
    //  return;
    //}
    //this.level = new WorldBuilder(this).buildFromJSON(json);
    this.level = new WorldBuilder(this).createWorld(30, 20, NoiseGen.Perlin(30, 20));

    this.input.on("pointermove", function (pointer) {
      if (!pointer.isDown) return;

      this.cameras.main.scrollX -=
        (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
      this.cameras.main.scrollY -=
        (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
    });

    this.input.on("wheel", function (pointer, go, dx, dy) {
      let zoom = this.cameras.main.zoom - 0.01 * dy;
      if (zoom < 1) zoom = 1;
      this.cameras.main.zoomTo(zoom, 10);
      //this.cameras.main.pan(pointer.x, pointer.y, 10);
    });
  },

  update: function () {},
};

Game.prototype.constructor = Game;

export default Game;
