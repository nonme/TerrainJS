import React from "react";
import Phaser from "phaser";
import Boot from "./../phaser/Boot";
import Game from "./../phaser/Game";
import Button from "@material-ui/core/Button";

function handleClick(e, button) {
    e.preventDefault();
    
    const event = new Event(button);
    window.dispatchEvent(event);
    console.log("sent");
  }

function GameComponent() {
  const config = {
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
      },
    },
  };

  const game = new Phaser.Game(config);
  game.scene.add("Boot", Boot, true);
  game.scene.add("Game", Game);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={(e) => handleClick(e, "restart")}
      >
        Restart
      </Button>
      <div id="phaser" />
    </>
  );
}

export default GameComponent;
