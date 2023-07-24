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

    if (positionPiece1 === 0 || positionPiece2 === 0) {
      return false;
    }

    const aroundPositions = this.getAdjacentPositions(positionPiece1);

    for (const aroundPosition of aroundPositions) {
      if (aroundPosition === positionPiece2) {
        return true;
      }
    }
    return false;
  }

  checkDiagonalPieces(piece1, piece2) {
    const positionPiece1 = piece1.getPosition();
    const positionPiece2 = piece2.getPosition();

    const diagonalPositions = this.getDiagonalPositions(positionPiece1);

    for (const diagonalPosition of diagonalPositions) {
      if (diagonalPosition === positionPiece2) {
        return true;
      }
    }
    return false;
  }

  checkAroundPaysan(position) {
    const aroundPieces = this.getAdjacentPositions(position);
    const diagonalPieces = this.getDiagonalPositions(position);
    const allPieces = aroundPieces.concat(diagonalPieces);

    const idPieces = [
      "quentin",
      "kelthoum",
      "frederic",
      "stephane",
      "philippe",
    ];

    for (const idPiece of idPieces) {
      let found = false;
      for (const aroundPiece of allPieces) {
        const piece = document.querySelector(
          `.recepPiece[data-position="${aroundPiece}"] .piece`
        );
        if (piece) {
          const pieceName = piece.getAttribute("data-name");
          if (pieceName === idPiece) {
            found = true;
          }
        }
      }

      if (!found) {
        return false;
      }
    }
    return true;
  }

  addWheatPiece(position) {
    const wheatPieces = document.querySelectorAll(".wheat");
    for (const wheatPiece of wheatPieces) {
      wheatPiece.classList.remove("active");
    }

    if (position === 0) {
      return;
    }

    const aroundPieces = this.getAdjacentPositions(position);
    const diagonalPieces = this.getDiagonalPositions(position);

    const allPieces = aroundPieces.concat(diagonalPieces);

    for (const aroundPiece of allPieces) {
      const wheat = document.querySelector(
        `.recepPiece[data-position="${aroundPiece}"] .wheat`
      );
      if (wheat) {
        wheat.classList.add("active");
      }
    }
  }

  addCrackPiece(position) {
    const crackPieces = document.querySelectorAll(".crack");
    for (const crackPiece of crackPieces) {
      crackPiece.classList.remove("active");
    }

    if (position === 0) {
      return;
    }

    const aroundPieces = this.getAdjacentPositions(position);

    for (const aroundPiece of aroundPieces) {
      const crack = document.querySelector(
        `.recepPiece[data-position="${aroundPiece}"] .crack`
      );
      if (crack) {
        crack.classList.add("active");
      }
    }
  }

  removeAdjacentPieces(position) {
    if (position === 0) {
      return;
    }

    const aroundPieces = this.getAdjacentPositions(position);
    const containerPieces = document.querySelector(".containerPieces");

    for (const aroundPiece of aroundPieces) {
      const piece = document.querySelector(
        `.recepPiece[data-position="${aroundPiece}"] .piece`
      );
      if (piece) {
        const pieceName = piece.getAttribute("data-name");
        this.pieces.getPiece(pieceName).setPosition(null);
        containerPieces.appendChild(piece);

        if (pieceName === "olivier") {
          const wheatPieces = document.querySelectorAll(".wheat");
          for (const wheatPiece of wheatPieces) {
            wheatPiece.classList.remove("active");
          }
        }
      }
    }
  }

  addOffice() {
    const officePieces = document.querySelectorAll(".office");
    for (const officePiece of officePieces) {
      officePiece.classList.add("active");
    }
  }

  getOfficePiece() {
    const offices = [6, 11, 15, 20];
    let pieces = [];

    for (const office of offices) {
      const piece = document.querySelector(
        `.recepPiece[data-position="${office}"] .piece`
      );
      if (piece) {
        const pieceName = piece.getAttribute("data-name");
        pieces.push(pieceName);
      }
    }
    return pieces;
  }

  endGame(message) {
    const loose = document.querySelector(".containerLoose");
    const content = loose.querySelector(".message");
    content.innerHTML = message;
    loose.classList.add("active");
  }

  init() {
    const containerGame = document.querySelector(".containerGame");
    const offices = [6, 11, 15, 20];

    for (let i = 0; i < this.nbPieces; i++) {
      const recepPiece = document.createElement("div");
      recepPiece.classList.add("recepPiece");
      recepPiece.setAttribute("data-position", i + 1);
      const crak = document.createElement("div");
      crak.classList.add("bg");
      crak.classList.add("crack");
      recepPiece.appendChild(crak);
      const wheat = document.createElement("div");
      wheat.classList.add("bg");
      wheat.classList.add("wheat");
      recepPiece.appendChild(wheat);
      containerGame.appendChild(recepPiece);

      if (offices.includes(i + 1)) {
        const office = document.createElement("div");
        office.classList.add("bg");
        office.classList.add("office");
        recepPiece.appendChild(office);
      }
    }
  }
}
