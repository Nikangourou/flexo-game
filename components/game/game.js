export default class Game {
  constructor() {
    this.pieces = [];
    this.nbPieces = 25;
  }

  addPiece(piece) {
    this.pieces.push(piece);
  }

  getPiece(position) {
    for (let i = 0; i < this.pieces.length; i++) {
      if (this.pieces[i].getPosition() === position) {
        return this.pieces[i];
      }
    }
  }

  getPieces() {
    return this.pieces;
  }

  init() {
    const containerGame = document.querySelector(".containerGame");
    for (let i = 0; i < this.nbPieces; i++) {
      const recepPiece = document.createElement("div");
      recepPiece.classList.add("recepPiece");
      recepPiece.setAttribute("data-position", i);
      containerGame.appendChild(recepPiece);
    }
  }
}
