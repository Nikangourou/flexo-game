export default class Rule {
  constructor(name, id, game, pieces) {
    this.name = name;
    this.id = id;
    this.game = game;
    this.pieces = pieces;
  }

  checkRule1() {
    return this.game.getNbPiecesInGame() > 2;
  }

  checkRule2() {
    const piece1 = this.pieces.getPiece("Quentin");
    const piece2 = this.pieces.getPiece("Lea");

    return this.game.checkAdjacentPieces(piece1, piece2);
  }

  checkRule() {
    // rule 1
    if (this.id === 1) {
      return this.checkRule1();
    }
    // rule 2
    if (this.id === 2) {
      return this.checkRule2();
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
