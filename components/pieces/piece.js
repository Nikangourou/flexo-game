export default class Piece {
  constructor(name, position, picture) {
    this.name = name;
    this.position = position;
    this.picture = picture;

    this.getPosition = function () {
      return this.position;
    };

    this.getName = function () {
      return this.name;
    };

    this.getHtml = function () {
      return `
            <div class="piece" draggable="true" data-name="${this.name}">
                <img src="/images/${this.picture}" alt="${this.name}">
            </div>
            `;
    };

   
  }


}
