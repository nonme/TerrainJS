import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import GameComponent from "./components/Game.jsx"

ReactDOM.render(
  <GameComponent/>,
  document.getElementById("root") || document.createElement("div")
);
