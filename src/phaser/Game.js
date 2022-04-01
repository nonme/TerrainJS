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

    this.elevationSeed = Math.random();
    this.moisureSeed   = Math.random();

    this.width = 40;
    this.height = 30;
    this.elevationConfig = {
      frequency: 5,
      amplitude: 1,
      octaves: 1,
      trim: true
    };

    this.moisureConfig = {
      frequency: 7,
      amplitude: 1,
      octaves: 2,
      trim: false
    }

    this.elevation = NoiseGen.Perlin(this.width, this.height, this.elevationConfig, this.elevationSeed);
    this.moisure = NoiseGen.Perlin(this.width, this.height, this.moisureConfig, this.moisureSeed);
    this.temperature = [];
    for (let i = 0; i < this.height; ++i) {
      this.temperature[i] = [];
      for (let j = 0; j < this.width; ++j) {
        let distance = Math.abs(i - this.height / 2);
        this.temperature[i][j] = (1 - distance / (this.height / 2)) + Math.random() * 0.2 - 0.1;
        console.log(this.temperature[i][j]);
      }
    }
  },

  create: function () {
    function restart(e) {
      this.elevationSeed = Math.random();
      this.moisureSeed   = Math.random();
      updateElevation.bind(this, e)();
      updateMoisure.bind(this, e)();
    }
    function updateElevation(e) {
      this.level.destroy();

      this.elevationConfig = {
        ...this.elevationConfig,
        ...e.detail
      };
      this.elevation = NoiseGen.Perlin(this.width, this.height, this.elevationConfig, this.elevationSeed);
      createWorld.bind(this)();
    }
    function updateMoisure(e) {
      this.level.destroy();

      this.moisureConfig = {
        ...this.moisureConfig,
        ...e.detail
      };
      this.moisure = NoiseGen.Perlin(this.width, this.height, this.moisureConfig, this.moisureSeed);
      createWorld.bind(this)();
    }

    function createWorld() {
      this.level = new WorldBuilder(this).createWorld(
        this.width,
        this.height,
        this.elevation,
        this.moisure,
        this.temperature
      );
    }
    createWorld.bind(this)();

    window.addEventListener("restart", restart.bind(this), false);
    window.addEventListener("elevation_update", updateElevation.bind(this), false);
    window.addEventListener("moisure_update", updateMoisure.bind(this), false);

    //this.game.sound.stopAll();
    //let json = this.cache.json.get("simple");
    //if (!json) {
    //  alert("Couldn't load json");
    //  return;
    //}
    //this.level = new WorldBuilder(this).buildFromJSON(json);

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
