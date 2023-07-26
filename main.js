import "./styles/main.scss";
import "./styles/pieces.scss";
import "./styles/game.scss";
import "./styles/rules.scss";
import Pieces from "./components/pieces/pieces";
import Game from "./components/game/game";
import Rules from "./components/rules/rules";
import Drag from "./components/util/drag";

const pieces = new Pieces();
pieces.init();

const game = new Game(pieces);
game.init();

const rules = new Rules(game, pieces);
rules.init();

const drag = new Drag(pieces, rules, game);
drag.init();

const replay = document.querySelector(".btn.replay");
replay.addEventListener("click", () => {
  window.location.reload();
});

const ok = document.querySelector(".btn.ok");
ok.addEventListener("click", () => {
  const containersFull = document.querySelectorAll(".containerFull");
  for (const containerFull of containersFull) {
    containerFull.classList.remove("active");
  }
});

console.log("Bouge de la Renaud !")