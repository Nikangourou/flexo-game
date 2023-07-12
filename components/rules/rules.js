import dataRules from "./data.json";
import Rule from "./rule.js";

export default class Rules {
  constructor(game, pieces) {
    this.rules = [];
    this.game = game;
    this.pieces = pieces;
  }

  addRule(rule) {
    this.rules.push(rule);
  }

  checkRules() {
    for (let i = 0; i < this.rules.length; i++) {
      this.rules[i].checkRule();
    }
  }

  init() {
    const containerRules = document.querySelector(".containerRules");
    for (let i = 0; i < dataRules.length; i++) {
      const rule = new Rule(dataRules[i].name, dataRules[i].id, this.game, this.pieces);
      this.addRule(rule);
      containerRules.innerHTML += rule.getHtml();
    }
  }
}
