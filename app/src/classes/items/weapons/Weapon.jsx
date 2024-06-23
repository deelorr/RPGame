import Item from "../Item";

class Weapon extends Item {
  constructor(name, useEffect, weaponDmg, price, quantity = 1) {
    super(name, useEffect, false, price, quantity);
    this.weaponDmg = weaponDmg;
  }
}

class IonAxe extends Weapon {
  constructor() {
    super(
      "Ion Axe",
      (target) => {
        target.hp -= this.weaponDmg;
      },
      15,
      80
    );
  }
}

class PlasmaSword extends Weapon {
  constructor() {
    super(
      "Plasma Sword",
      (target) => {
        target.hp -= this.weaponDmg;
      },
      20,
      100
    );
  }
}

class QuantumRifle extends Weapon {
  constructor() {
    super(
      "Quantum Rifle",
      (target) => {
        target.hp -= this.weaponDmg;
      },
      50,
      200
    );
  }
}

export { IonAxe, PlasmaSword, QuantumRifle };
export default Weapon;
