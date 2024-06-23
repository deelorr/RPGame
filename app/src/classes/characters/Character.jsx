import Weapon from "../items/weapons/Weapon";
import Armor from "../items/armor/Armor";

class Character {
  constructor(name, maxHp, baseDmg) {
    this.name = name;
    this.hp = maxHp;
    this.maxHp = maxHp;
    this.baseDmg = baseDmg;
    this.dmg = baseDmg;
    this.armor = 0;
  }

  attack(target) {
    target.takeDmg(this.dmg);
    return `${this.name} attacks ${target.name} for ${this.dmg} damage.`;
  }

  takeDmg(amount) {
    this.hp -= amount;
    if (this.hp <= 0) {
      return `${this.name} takes ${amount} damage and has been defeated.`;
    } else {
      return `${this.name} takes ${amount} damage. HP is now ${this.hp}.`;
    }
  }

  giveItem(item, target) {
    target.receiveItem(item);
    return `${this.name} gives ${item.name} to ${target.name}.`;
  }

  receiveItem(item) {
    if (item instanceof Weapon) {
      return this.equipWeapon(item);
    } else if (item instanceof Armor) {
      return this.equipArmor(item);
    } else {
      this.inventory.push(item);
      return `${item.name} added to inventory.`;
    }
  }
}

export default Character;
