import dataRules from "./data.json";
import Rule from "./rule.js";

export default class Rules {
  constructor() {
    this.rules = [];
  }

  addRule(rule) {
    this.rules.push(rule);
  }

  init() {
    const containerRules = document.querySelector(".containerRules");
    for (let i = 0; i < dataRules.length; i++) {
      const rule = new Rule(dataRules[i].name, dataRules[i].id);
      this.addRule(rule);
      containerRules.innerHTML += rule.getHtml();
    }
  }
}
