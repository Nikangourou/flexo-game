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

const replays = document.querySelectorAll(".btn.replay");

for (const replay of replays) {
  replay.addEventListener("click", () => {
    window.location.reload();
  });
}

const ok = document.querySelectorAll(".btn.ok");
for (const button of ok) {
  button.addEventListener("click", () => {
    const containerFull = document.querySelector(".containerFull.active");
    if (containerFull) {
      containerFull.classList.remove("active");
    }
  });
}

console.log("Bouge de la Renaud, je sais que t'es là !");
