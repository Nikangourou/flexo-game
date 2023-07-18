export default class Piece {
  constructor(name, picture, position = 0) {
    this.name = name;
    this.picture = picture;
    this.position = position;
  }

  showName = function () {
    const piece = document.querySelector(`[data-name="${this.name}"]`);
    piece.classList.add("showName");
    console.log(this.name);
  };

  getHtml = function () {
    return `
          <div class="piece" draggable="true" data-name="${this.name}">
              <p class="pieceName">${this.name}</p>
              <img src="/images/${this.picture}" alt="${this.name}">
          </div>
          `;
  };

  getPosition = function () {
    return this.position;
  };

  setPosition = function (position) {
    this.position = position;
  };
}
