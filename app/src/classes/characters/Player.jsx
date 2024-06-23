import Character from "./Character";
import Quest from "../quests/Quest";
class Player extends Character {
  constructor(name, maxHp, baseDmg, special) {
    super(name, maxHp, baseDmg);
    this.special = special;
    this.sprite = "/Ally.png";
    this.gold = 200;
    this.equippedWeapon = null;
    this.equippedArmor = null;
    this.inventory = [];
    this.quests = [];
  }

  equipWeapon(weapon) {
    this.dmg += weapon.weaponDmg;
    this.equippedWeapon = weapon;
    return `${this.equippedWeapon.name} equipped! Damage increased to ${this.dmg}.`;
  }

  equipArmor(armor) {
    this.hp += armor.armor;
    this.equippedArmor = armor;
    return `${this.equippedArmor.name} equipped! HP increased to ${this.hp}.`;
  }

  useSpecial(target) {
    target.takeDmg(this.dmg * 2);
    return `${this.name} uses ${this.special} and deals ${
      this.dmg * 2
    } damage to ${target.name}!`;
  }

  useItem(itemName, target) {
    const itemIndex = this.inventory.findIndex((i) => i.name === itemName);
    if (itemIndex > -1) {
      const item = this.inventory[itemIndex];
      if (typeof item.use === "function") {
        item.use(target);
        if (item.isConsumable) {
          this.inventory.splice(itemIndex, 1); // Remove the used item from the inventory
        }
        return `${this.name} uses ${item.name} on ${target.name}.`;
      } else {
        throw new Error(`${item.name} has no use function.`);
      }
    } else {
      return `${itemName} not found in inventory.`;
    }
  }

  // Quest-related methods
  acceptQuest(quest) {
    if (quest instanceof Quest) {
      this.quests.push(quest);
      quest.startQuest();
      return `Quest "${quest.name}" accepted!`;
    } else {
      throw new Error(`Invalid quest.`);
    }
  }

  completeQuest(questName) {
    const quest = this.quests.find((q) => q.name === questName);
    if (quest && quest.status === "In Progress") {
      quest.completeQuest();
      return `Quest "${quest.name}" completed! Rewards received?`;
    } else {
      return `Quest "${questName}" not found or already completed.`;
    }
  }

  checkQuestProgress() {
    return this.quests.map((quest) => ({
      name: quest.name,
      status: quest.status,
      objectives: quest.objectives,
    }));
  }
}

export default Player;
