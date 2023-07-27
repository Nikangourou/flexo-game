export default class Drag {
  constructor(pieces, rules, game) {
    this.pieces = pieces;
    this.rules = rules;
    this.game = game;
    this.dragHulk = false;
    this.dragAmina = false
  }

  init() {
    const draggables = document.querySelectorAll(".piece");
    const receptacles = document.querySelectorAll(".recepPiece");

    let draggedPiece = null;

    // Fonction de prévisualisation lors du survol du réceptacle
    const handleReceptacleHover = (event) => {
      event.preventDefault();
      if (draggedPiece) {
        event.currentTarget.classList.add("preview");
      }
    };
    // Fonction de réinitialisation de la prévisualisation du réceptacle
    const resetReceptaclePreview = () => {
      for (const receptacle of receptacles) {
        receptacle.classList.remove("preview");
      }
    };

    // Fonction de démarrage du glisser-déposer
    const handleDragStart = (event) => {
      event.currentTarget.classList.add("dragging");
      draggedPiece = event.currentTarget;
    };

    // Fonction de fin du glisser-déposer
    const handleDragEnd = (event) => {
      event.currentTarget.classList.remove("dragging");
      resetReceptaclePreview();
      draggedPiece = null;
    };

    // Fonction de gestion du dépôt de la pièce dans le réceptacle

    const handleDrop = (event) => {
      event.preventDefault();
      const receptacle = event.currentTarget;
      const pieceName = draggedPiece.getAttribute("data-name");
      const piece = this.pieces.getPiece(pieceName);
      let pieceInReceptacleName = null;
      let pieceInReceptacleObject = null;

      const crack = receptacle.querySelector(".crack.active");

      if (crack) {
        if (pieceName === "paul") {
          crack.classList.remove("active");
        }
        else {
          return false;
        }
      }

      // Vérifier si le réceptacle contient déjà une pièce et si le receptacle n'est pas le containerPieces
      if (
        receptacle.querySelector(".piece") &&
        !receptacle.classList.contains("containerPieces")
      ) {
        // inverser les pièces

        const pieceInReceptacle = receptacle.querySelector(".piece");
        pieceInReceptacleName = pieceInReceptacle.getAttribute("data-name");
        pieceInReceptacleObject = this.pieces.getPiece(pieceInReceptacleName);

        let tmpPosition = piece.getPosition();

        piece.setPosition(pieceInReceptacleObject.getPosition());
        pieceInReceptacleObject.setPosition(tmpPosition);

        if (!tmpPosition) {
          const containerPieces = document.querySelector(".containerPieces");
          containerPieces.appendChild(pieceInReceptacle);
        } else {
          const resep = document.querySelector(
            `.recepPiece[data-position="${pieceInReceptacleObject.getPosition()}"]`
          );
          resep.appendChild(pieceInReceptacle);
        }
        receptacle.appendChild(draggedPiece);
      }

      piece.setPosition(receptacle.getAttribute("data-position"));
      ``;

      // Ajouter la pièce au réceptacle
      receptacle.appendChild(draggedPiece);
      resetReceptaclePreview();

      if(pieceName === "amina"){
        if(!this.dragAmina){
          this.game.removeTimeSheet()
          this.dragAmina = true

          const container = document.querySelector(".containerTimeSheet");
          container.classList.add("active");
        }
      }

      if (pieceName === "osei") {
        this.game.removeAdjacentPieces(piece.getPosition());
        this.game.addCrackPiece(piece.getPosition());

        if (!this.dragHulk) {
          const container = document.querySelector(".containerOseiExp");
          container.classList.add("active");
          this.dragHulk = true;
        }
      }

      if (pieceInReceptacleName === "osei") {
        this.game.removeAdjacentPieces(pieceInReceptacleObject.getPosition());
        this.game.addCrackPiece(pieceInReceptacleObject.getPosition());
      }

      if (pieceName === "olivier") {
        this.game.addWheatPiece(piece.getPosition());
      }

      if (pieceInReceptacleName === "olivier") {
        this.game.addWheatPiece(pieceInReceptacleObject.getPosition());
      }

      this.game.nbPiecesInGame = document.querySelectorAll(
        ".containerGame .piece"
      ).length;

      this.rules.checkRules();
    };

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
  }
}
