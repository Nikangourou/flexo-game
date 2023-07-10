import dataPieces from "./data.json";
import Piece from "./piece.js";

export default class Pieces {
  constructor() {
    this.pieces = [];
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
    const containerPieces = document.querySelector(".containerPieces");

    for (let i = 0; i < dataPieces.length; i++) {
      const piece = new Piece(
        dataPieces[i].name,
        dataPieces[i].position,
        dataPieces[i].picture
      );
      this.addPiece(piece);
      containerPieces.innerHTML += piece.getHtml();
    }
  }
}
