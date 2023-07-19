export default class Game {
  constructor(pieces) {
    this.nbPieces = 25;
    this.nbRows = 5;
    this.nbColumns = 5;
    this.nbPiecesInGame = 0;
    this.pieces = pieces;
  }

  getNbPiecesInGame() {
    return this.nbPiecesInGame;
  }

  checkCornerPiece(piece) {
    const positionPiece = piece.getPosition();

    if (
      positionPiece === 1 ||
      positionPiece === 5 ||
      positionPiece === 21 ||
      positionPiece === 25
    ) {
      return true;
    } else {
      return false;
    }
  }

  getAdjacentPositions(position) {
    const aroundPositions = [
      position - 1,
      position + 1,
      position - this.nbRows,
      position + this.nbRows,
    ];

    if (position % this.nbRows === 0) {
      aroundPositions.splice(1, 1);
    }

    if (position % this.nbRows === 1) {
      aroundPositions.splice(0, 1);
    }

    if (position <= this.nbRows) {
      // aroundPositions.splice(2, 1);
    }

    if (position > this.nbPieces - this.nbRows) {
      aroundPositions.splice(3, 1);
    }

    return aroundPositions;
  }

  getDiagonalPositions(position) {
    const diagonalPositions = [
      position - this.nbRows - 1,
      position - this.nbRows + 1,
      position + this.nbRows - 1,
      position + this.nbRows + 1,
    ];

    if (position % this.nbRows === 0) {
      diagonalPositions.splice(1, 1);
      diagonalPositions.splice(2, 1);
    }

    if (position % this.nbRows === 1) {
      diagonalPositions.splice(0, 1);
      diagonalPositions.splice(1, 1);
    }

    if (position <= this.nbRows) {
      diagonalPositions.splice(0, 1);
      diagonalPositions.splice(1, 1);
    }

    if (position > this.nbPieces - this.nbRows) {
      diagonalPositions.splice(2, 1);
      diagonalPositions.splice(3, 1);
    }

    return diagonalPositions;
  }
  
  checkAdjacentPieces(piece1, piece2) {
    const positionPiece1 = piece1.getPosition();
    const positionPiece2 = piece2.getPosition();
  
    const aroundPositions = this.getAdjacentPositions(positionPiece1);

    for (const aroundPosition of aroundPositions) {
      if (aroundPosition === positionPiece2) {
        return true;
      }
    }
    return false;
  }

  checkAroundPieces(piece) {
    const positionPiece = piece.getPosition();
    const aroundPieces = this.getAdjacentPositions(positionPiece);

    for (const aroundPiece of aroundPieces) {
      const recepPiece = document.querySelector(
        `.recepPiece[data-position="${aroundPiece}"]`
      );
      if (recepPiece && recepPiece.children.length > 0) {
        return true;
      }
    }
    return false;
  }

  addCrackPiece(position) {
    const crackPieces = document.querySelectorAll(".crack");
    for (const crackPiece of crackPieces) {
      crackPiece.classList.remove("crack");
    }

    const aroundPieces = this.getAdjacentPositions(position);

    for (const aroundPiece of aroundPieces) {
      const recepPiece = document.querySelector(
        `.recepPiece[data-position="${aroundPiece}"]`
      );
      if (recepPiece) {
        recepPiece.classList.add("crack");
      }
    }
  }

  removeAdjacentPieces(piece) {
    const positionPiece = piece.getPosition();
    const aroundPieces = this.getAdjacentPositions(positionPiece);
    const containerPieces = document.querySelector(".containerPieces");

    for (const aroundPiece of aroundPieces) {
      const recepPiece = document.querySelector(
        `.recepPiece[data-position="${aroundPiece}"]`
      );
      if (recepPiece && recepPiece.children.length > 0) {
        const pieceName = recepPiece.children[0].getAttribute("data-name");
        this.pieces.getPiece(pieceName).setPosition(null);
        containerPieces.appendChild(recepPiece.children[0]);
        recepPiece.innerHTML = "";
      }
    }
  }

  endGame(message) {
    const loose = document.querySelector(".containerLoose");
    const content = loose.querySelector(".message");
    content.innerHTML = message;
    loose.classList.add("active");
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
