"use strict";

import WorldCreator from "../terrain-js/WorldCreator";
import HexWorldPainter from "./HexWorldPainter";
import canvasToImage from "canvas-to-image";

function Game() {
  this.world;
}

Game.prototype.constructor = Game;

Game.prototype.preload = function () {
  this.cameras.main.zoomTo(2, 10);
  this.cameras.main.pan(100, 100, 10);

  let elevationTags = ["ocean", "sea", "plains", "hills", "mountains"];
  let moistureTags = ["superarid", "arid", "humid", "superhumid"];
  let temperatureTags = ["polar", "cold", "moderate", "hot", "desert"];

  let elevationThresholds = [0, 0.45, 0.6, 0.8, 0.9];
  let temperatureThresholds = [-1, -0.8, -0.5, 0.5, 0.9];
  let moistureThresholds = [0, 0.25, 0.5, 0.75];

  this.tagsInfo = {
    elevation: {
      tags: elevationTags,
      thresholds: elevationThresholds,
    },
    moisture: {
      tags: moistureTags,
      thresholds: moistureThresholds,
    },
    temperature: {
      tags: temperatureTags,
      thresholds: temperatureThresholds,
    },
  };

  this.worldCreator = new WorldCreator(40, 30, this.tagsInfo);
  this.worldPainter = new HexWorldPainter(this);
};

Game.prototype.create = function () {
  this.worldPainter.initialize(this.tagsInfo);
  this.world = this.worldCreator.build();
  this.worldPainter.draw(this.world);

  window.addEventListener(
    "restart",
    (e) => {
      this.world = this.worldCreator
        .reseed()
        .build();
      this.worldPainter.draw(this.world);
      //const canvas = document.getElementById("phaser").firstChild;
      //canvasToImage(canvas, {
      //  name: "terrainJS",
      //  type: "png",
      //  quality: 1.0,
      //});
    },
    false
  );
  window.addEventListener(
    "elevation_update",
    (e) => {
      this.world = this.worldCreator.setElevationOptions(e.detail).build();
      this.worldPainter.draw(this.world);
    },
    false
  );
  window.addEventListener(
    "moisure_update",
    (e) => {
      this.world = this.worldCreator.setMoisureOptions(e.detail).build();
      this.worldPainter.draw(this.world);
    },
    false
  );
  window.addEventListener(
    "temperature_update",
    (e) => {
      this.world = this.worldCreator.setTemperatureOptions(e.detail).build();
      this.worldPainter.draw(this.world);
    },
    false
  );

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
};
Game.prototype.update = function () {};

export default Game;
