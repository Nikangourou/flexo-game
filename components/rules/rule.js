export default class Rule {
  constructor(name, id, game, pieces) {
    this.name = name;
    this.id = id;
    this.game = game;
    this.pieces = pieces;
  }

  checkRulePredator() {
    const lionne = this.pieces.getPiece("kelthoum");
    const pirahna = this.pieces.getPiece("lea");

    const renne = this.pieces.getPiece("stephane");
    const raton = this.pieces.getPiece("philippe");

    if (this.game.checkAdjacentPieces(lionne, renne)) {
      this.game.endGame("Le Renne a été mangé par La Lionne");
    }

    if (this.game.checkAdjacentPieces(lionne, raton)) {
      this.game.endGame("Le Raton a été mangé par La Lionne");
    }

    if (this.game.checkAdjacentPieces(pirahna, renne)) {
      this.game.endGame("Le Renne a été mangé par Le Pirahna");
    }

    if (this.game.checkAdjacentPieces(pirahna, raton)) {
      this.game.endGame("Le Raton a été mangé par Le Pirahna");
    }
  }

  checkRule1() {
    return this.game.getNbPiecesInGame() > 2;
  }

  checkRule2() {
    const piece1 = this.pieces.getPiece("quentin");
    const piece2 = this.pieces.getPiece("lea");

    return this.game.checkAdjacentPieces(piece1, piece2);
  }

  checkRule3() {
    const piece = this.pieces.getPiece("matthieu");

    return this.game.checkCornerPiece(piece);
  }

  checkRule4() {}

  checkRule() {
    this.checkRulePredator();

    // rule 1
    if (this.id === 1) {
      // return true;
      return this.checkRule1();
    }
    // rule 2
    if (this.id === 2) {
      // return true;
      return this.checkRule2();
    }

    // rule 3
    if (this.id === 3) {
      // return true;
      return this.checkRule3();
    }

    if (this.id === 4) {
      return this.checkRule4();
    }
  }

  getHtml() {
    return `
            <div class="rule">
            <p class="title">Règle ${this.id}</p>
             <p class="content">${this.name}</p>
            </div>
            `;
  }
}
