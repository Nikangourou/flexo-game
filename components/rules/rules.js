import dataRules from "./data.json";
import Rule from "./rule.js";

export default class Rules {
  constructor() {
    this.rules = [];
  }

  addRule(rule) {
    this.rules.push(rule);
  }

  getRule(name) {
    for (let i = 0; i < this.rules.length; i++) {
      if (this.rules[i].getName() === name) {
        return this.rules[i];
      }
    }
  }

  getRules() {
    return this.rules;
  }

  init() {
    const containerRules = document.querySelector(".containerRules");
    for (let i = 0; i < dataRules.length; i++) {
      const rule = new Rule(dataRules[i].name);
      this.addRule(rule);
      containerRules.innerHTML += rule.getHtml();
    }
  }
}
