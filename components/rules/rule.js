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

  checkRule4() {
    const piece = this.pieces.getPiece("olivier");
    return this.game.checkAroundPaysan(piece.getPosition());
  }

  checkRule5() {
    const joker = this.pieces.getPiece("rodrigue");

    if (joker.getPosition()) {
      return true;
    }

    return false;
  }

  checkRule6() {
    const piece = this.pieces.getPiece("nicolas");
    return piece.getPosition() === 10;
  }

  checkRule7() {
    const piece1 = this.pieces.getPiece("renaud");
    const piece2 = this.pieces.getPiece("nicolas");
    return this.game.checkDiagonalPieces(piece1, piece2);
  }

  checkRule8() {
    this.game.addOffice();
    const officePieces = this.game.getOfficePiece();
    const officeRules = ["fba", "stephane", "amina", "sarah"];

    if (officePieces.length !== officeRules.length) {
      return false;
    }

    for (const officePiece of officePieces) {
      if (!officeRules.includes(officePiece)) {
        return false;
      }
    }

    return true;
  }

  checkRule9() {
    const isabelle = this.pieces.getPiece("isabelle");
    const felicie = this.pieces.getPiece("felicie");
    const kevin = this.pieces.getPiece("kevin");

    if (!this.game.checkAdjacentPieces(isabelle, kevin)) {
      return false;
    }

    if (!this.game.checkAdjacentPieces(felicie, kevin)) {
      return false;
    }

    return true;
  }

  checkRule10() {
    const olivier = this.pieces.getPiece("olivier");
    const renaud = this.pieces.getPiece("renaud");

    if (!this.game.checkAdjacentPieces(olivier, renaud)) {
      return false;
    }

    return true;
  }

  checkRule11() {
    const francois = this.pieces.getPiece("francois");
    const robin = this.pieces.getPiece("robin");

    if(!this.game.checkCornerPiece(francois)){
      return false;
    }

    if (!this.game.checkAdjacentPieces(francois, robin)) {
      return false;
    }

    return true;
  }

  checkRule() {
    this.checkRulePredator();

    if (this.id === 1) {
      // return true;
      return this.checkRule1();
    }

    if (this.id === 2) {
      // return true;
      return this.checkRule2();
    }

    if (this.id === 3) {
      // return true;
      return this.checkRule3();
    }

    if (this.id === 4) {
      // return true;
      return this.checkRule4();
    }

    if (this.id === 5) {
      // return true;
      return this.checkRule5();
    }

    if (this.id === 6) {
      // return true;
      return this.checkRule6();
    }

    if (this.id === 7) {
      // return true;
      return this.checkRule7();
    }

    if (this.id === 8) {
      // return true;
      return this.checkRule8();
    }

    if (this.id === 9) {
      // return true;
      return this.checkRule9();
    }

    if (this.id === 10) {
      // return true;
      return this.checkRule10();
    }

    if(this.id === 11){
      // return true;
      return this.checkRule11();
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
