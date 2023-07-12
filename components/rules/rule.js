export default class Rule {
  constructor(name, id, game, pieces) {
    this.name = name;
    this.id = id;
    this.game = game;
    this.pieces = pieces;
  }

  checkRule1() {
    const piece1 = this.pieces.getPiece("Quentin");
    const piece2 = this.pieces.getPiece("Lea");

    this.game.checkAdjacentPieces(piece1, piece2)
      ? console.log("true")
      : console.log("false");
  }

  checkRule() {
    if (this.id === 1) {
      this.checkRule1();
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
