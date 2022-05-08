import React from "react";
import Phaser from "phaser";
import Game from "../phaser/Game";
import Grid from "@mui/material/Grid";
import NoisePanel from "./ui/NoisePanel.jsx";

function GameComponent() {
  const config = {
    type: Phaser.FIT,
    parent: "phaser",
    width: 1280,
    height: 800,
    backgroundColor: "#00579B", // 181A1B
    //transparent: true,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
      pixelArt: true,
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
      },
    },
  };

  const game = new Phaser.Game(config);
  game.scene.add("Game", Game, true);

  return (
    <Grid container spacing={2}>
      <Grid item xs>
        <NoisePanel />
      </Grid>
      <Grid item xs={8}>
        <div id="phaser" />
      </Grid>
      <Grid item xs>
        <NoisePanel />
      </Grid>
    </Grid>
  );
}

export default GameComponent;
