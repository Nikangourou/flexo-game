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

const game = new Game();
game.init();

const rules = new Rules(game, pieces);
rules.init();

const drag = new Drag(pieces, rules, game);
drag.init();

