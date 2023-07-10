export default class Rule {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getHtml() {
    return `
            <div class="rule">
             <p>${this.name}"</p>
            </div>
            `;
  }
}
