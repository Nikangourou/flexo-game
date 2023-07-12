export default class Piece {
  constructor(name, picture, position = 0) {
    this.name = name;
    this.picture = picture;
    this.position = position;
  }

  getHtml = function () {
    return `
          <div class="piece" draggable="true" data-name="${this.name}">
              <img src="/images/${this.picture}" alt="${this.name}">
          </div>
          `;
  };

  getPosition = function () {
    return this.position;
  }

  setPosition = function (position) {
    this.position = position;
  }
}
