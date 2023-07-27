import dataRules from "./data.json";
import Rule from "./rule.js";

export default class Rules {
  constructor(game, pieces) {
    this.rules = [];
    this.game = game;
    this.pieces = pieces;
    this.nbShowRules = 1;
    this.time = 0;
  }

  addRule(rule) {
    this.rules.push(rule);
  }

  checkRules() {
    let tmpNbShowRules = 1;
    for (let i = 0; i < this.nbShowRules; i++) {
      const rule = document.querySelector(`.rule:nth-child(${i + 1})`);
      if (rule) {
        rule.classList.add("active");
        if (this.rules[i].checkRule()) {
          rule.classList.add("valid");
          tmpNbShowRules++;
        } else {
          rule.classList.remove("valid");
        }
      }

      if (this.nbShowRules === this.rules.length + 1) {
        const win = document.querySelector(".containerWin");
        win.querySelector(".message").innerHTML = "Bravo ! Tu as fini le jeu en " + this.time + " secondes !";
        win.querySelector(".subMessage").innerHTML = "Merci à toute la team Havas pour cette belle année ! See you soon !";
        win.classList.add("active");
      }

      if (tmpNbShowRules > this.nbShowRules) {
        this.nbShowRules = tmpNbShowRules;
        this.checkRules();
      }
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

    setInterval(() => {
      this.time += 1;
    }, 1000);

    this.checkRules();
  }
}
