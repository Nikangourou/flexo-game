export default class Drag {
  constructor(pieces, rules, game) {
    this.pieces = pieces;
    this.rules = rules;
    this.game = game;
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

      // Vérifier si le réceptacle contient déjà une pièce et si le receptacle n'est pas le containerPieces
      if (
        receptacle.querySelector(".piece") &&
        !receptacle.classList.contains("containerPieces")
      ) {
        // inverser les pièces
     
        const pieceInReceptacle = receptacle.querySelector(".piece");
        const pieceInReceptacleName =
          pieceInReceptacle.getAttribute("data-name");
        const pieceInReceptacleObject = this.pieces.getPiece(
          pieceInReceptacleName
        );

        let tmpPosition = piece.getPosition();

        piece.setPosition(pieceInReceptacleObject.getPosition());
        pieceInReceptacleObject.setPosition(tmpPosition);

        if (!tmpPosition) {
          const containerPieces = document.querySelector(".containerPieces");
          containerPieces.appendChild(pieceInReceptacle);
        }else{
          const resep = document.querySelector(`.recepPiece[data-position="${pieceInReceptacleObject.getPosition()}"]`);
          console.log(resep);
          resep.appendChild(pieceInReceptacle);
        }
        receptacle.appendChild(draggedPiece);

        // debuger le code ici pour clear !!!!!!!!!!!!
      }

      // get piece object
      this.pieces
        .getPiece(pieceName)
        .setPosition(receptacle.getAttribute("data-position"));

      // Ajouter la pièce au réceptacle
      receptacle.appendChild(draggedPiece);
      resetReceptaclePreview();

      if (pieceName === "osei") {
        this.game.removeAdjacentPieces(piece.getPosition());
        this.game.addCrackPiece(piece.getPosition());
      }

      if (pieceName === "olivier") {
        this.game.addWheatPiece(piece.getPosition());
        console.log("olivier");
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
