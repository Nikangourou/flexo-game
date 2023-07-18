import dataRules from "./data.json";
import Rule from "./rule.js";

export default class Rules {
  constructor(game, pieces) {
    this.rules = [];
    this.game = game;
    this.pieces = pieces;
    this.nbShowRules = 1;
  }

  addRule(rule) {
    this.rules.push(rule);
  }

  checkRules() {
    let tmpNbShowRules = 1;
    for (let i = 0; i < this.nbShowRules; i++) {
      const rule = document.querySelector(`.rule:nth-child(${i + 1})`);
      rule.classList.add("active");
      if (this.rules[i].checkRule()) {
        rule.classList.add("valid");
        tmpNbShowRules++;
      } else {
        rule.classList.remove("valid");
      }
    }
  
    if(tmpNbShowRules > this.nbShowRules) {
      this.nbShowRules = tmpNbShowRules;
      this.checkRules();
    }
  }

  init() {
    const containerRules = document.querySelector(".containerRules");
    for (let i = 0; i < dataRules.length; i++) {
      const rule = new Rule(
        dataRules[i].name,
        dataRules[i].id,
        this.game,
        this.pieces
      );
      this.addRule(rule);
      containerRules.innerHTML += rule.getHtml();
    }

    this.checkRules();
  }
}
