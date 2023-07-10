import dataPieces from "./data.json";
import Piece from "./piece.js";

export default class Pieces {
  constructor() {
    this.pieces = [];
  }

  addPiece(piece) {
    this.pieces.push(piece);
  }

  getPiece(name) {
    for (const piece of this.pieces) {
      if (piece.name === name) {
        return piece;
      }
    }
  }

  init() {
    const containerPieces = document.querySelector(".containerPieces");

    for (let i = 0; i < dataPieces.length; i++) {
      const piece = new Piece(dataPieces[i].name, dataPieces[i].picture);
      this.addPiece(piece);
      containerPieces.innerHTML += piece.getHtml();
    }
  }
}
