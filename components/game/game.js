export default class Game {
  constructor() {
    this.nbPieces = 25;
    this.nbRows = 5;
    this.nbColumns = 5;
  }



  checkAdjacentPieces(piece1, piece2) {
    const positionPiece1 = piece1.getPosition();
    const positionPiece2 = piece2.getPosition();
    const positionPiece1Row = Math.floor(positionPiece1 / this.nbRows);
    const positionPiece1Column = positionPiece1 % this.nbColumns;
    const positionPiece2Row = Math.floor(positionPiece2 / this.nbRows);
    const positionPiece2Column = positionPiece2 % this.nbColumns;

    if (
      (positionPiece1Row === positionPiece2Row &&
        Math.abs(positionPiece1Column - positionPiece2Column) === 1) ||
      (positionPiece1Column === positionPiece2Column &&
        Math.abs(positionPiece1Row - positionPiece2Row) === 1)
    ) {
      return true;
    } else {
      return false;
    }
  }

  init() {
    const containerGame = document.querySelector(".containerGame");
    for (let i = 0; i < this.nbPieces; i++) {
      const recepPiece = document.createElement("div");
      recepPiece.classList.add("recepPiece");
      recepPiece.setAttribute("data-position", i + 1);
      containerGame.appendChild(recepPiece);
    }
  }
}
