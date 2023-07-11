export default class Rule {
  constructor(name, id) {
    this.name = name;
    this.id = id;
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
