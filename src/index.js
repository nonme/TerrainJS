import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import Boot from "./phaser/Boot";
import Game from "./phaser/Game";

export const config = {
  type: Phaser.AUTO,
  parent: "phaser",
  width: 1280,
  height: 800,
  backgroundColor: "#00579B", // 181A1B
  //transparent: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    width: 1280,
    height: 800,
    zoom: Phaser.Scale.MAX_ZOOM,
    min: {
      width: 320,
      height: 200,
    },
    max: {
      width: 1280,
      height: 800,
    }
  },
};

const game = new Phaser.Game(config);
game.scene.add("Boot", Boot, true);
game.scene.add("Game", Game);

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
