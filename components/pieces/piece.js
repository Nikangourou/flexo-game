export default class Piece {
  constructor(id, name, picture, position = 0) {
    this.name = name;
    this.picture = picture;
    this.position = position;
    this.id = id;
  }

  getHtml = function () {
    return `
          <div class="piece" draggable="true" data-name="${this.id}">
              <p class="pieceName">${this.name}</p>
              <img src="/images/${this.picture}" alt="${this.name}">
          </div>
          `;
  };

  getPosition = function () {
    return this.position;
  };

  setPosition = function (position) {
    this.position = parseInt(position);
  };
}
