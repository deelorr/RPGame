import Enemy from "./Enemy";

class Matt extends Enemy {
  constructor(name = "Matt", hp = 150, dmg = 10) {
    super(name, hp, dmg);
    this.weakness = "fire";
  }
}

export default Matt;
