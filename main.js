import "./styles/main.scss";
import "./styles/pieces.scss";
import "./styles/game.scss";
import "./styles/rules.scss";
import Pieces from "./components/pieces/pieces";
import Game from "./components/game/game";
import Rules from "./components/rules/rules";

const pieces = new Pieces();
pieces.init();

const game = new Game();
game.init();

const rules = new Rules();
rules.init();

const draggables = document.querySelectorAll(".piece");
const receptacles = document.querySelectorAll(".recepPiece");

let draggedPiece = null;

// Fonction de prévisualisation lors du survol du réceptacle
function handleReceptacleHover(event) {
  event.preventDefault();
  if (draggedPiece) {
    event.currentTarget.classList.add("preview");
  }
}

// Fonction de réinitialisation de la prévisualisation du réceptacle
function resetReceptaclePreview() {
  for (const receptacle of receptacles) {
    receptacle.classList.remove("preview");
  }
}

// Fonction de démarrage du glisser-déposer
function handleDragStart(event) {
  event.currentTarget.classList.add("dragging");
  draggedPiece = event.currentTarget;
}

// Fonction de fin du glisser-déposer
function handleDragEnd(event) {
  event.currentTarget.classList.remove("dragging");
  resetReceptaclePreview();
  draggedPiece = null;
}

// Fonction de gestion du dépôt de la pièce dans le réceptacle
function handleDrop(event) {
  event.preventDefault();
  const receptacle = event.currentTarget;

  // Vérifier si le réceptacle contient déjà une pièce ou si le receptacle n'est pas le containerPieces
  if (
    receptacle.children.length > 0 &&
    !receptacle.classList.contains("containerPieces")
  ) {
    return;
  }

  // get piece name
  const pieceName = draggedPiece.getAttribute("data-name");
  // get piece object
  const piece = pieces.getPiece(pieceName);
  // set piece position
  piece.setPosition(receptacle.getAttribute("data-position"));

  // Ajouter la pièce au réceptacle
  receptacle.appendChild(draggedPiece);
  resetReceptaclePreview();
}

// Ajouter les écouteurs d'événements pour chaque pièce
for (const draggable of draggables) {
  draggable.addEventListener("dragstart", handleDragStart);
  draggable.addEventListener("dragend", handleDragEnd);
}

// Ajouter les écouteurs d'événements pour chaque réceptacle
for (const receptacle of receptacles) {
  receptacle.addEventListener("dragover", handleReceptacleHover);
  receptacle.addEventListener("dragleave", resetReceptaclePreview);
  receptacle.addEventListener("drop", handleDrop);
}
