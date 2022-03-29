"use strict";

function Boot() {}

Boot.prototype.constructor = Boot;

Boot.prototype = {
  preload: function () {},
  create: function (data) {
    this.scene.start("Game");
  },
};

export default Boot;
