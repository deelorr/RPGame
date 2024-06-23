class Battle {
  constructor(player, enemy) {
    this.player = player;
    this.enemy = enemy;
    this.turn = 0;
  }

  start() {
    console.log(`${this.player.name} vs ${this.enemy.name}`);
  }

  playerAttack() {
    this.player.attack(this.enemy);
    console.log(`${this.player.name} attacks ${this.enemy.name}!`);
    if (this.enemy.hp <= 0) {
      console.log(this.end());
      return "ended";
    }
    this.turn++;
    return "playerTurnEnded";
  }

  enemyAttack() {
    this.enemy.attack(this.player);
    console.log(`${this.enemy.name} attacks ${this.player.name}!`);
    if (this.player.hp <= 0) {
      console.log(this.end());
      return "ended";
    }
    this.turn++;
    return "enemyTurnEnded";
  }

  end() {
    if (this.player.hp <= 0) {
      return `${this.player.name} has been defeated.`;
    } else if (this.enemy.hp <= 0) {
      return `${this.enemy.name} has been defeated.`;
    }
    return "The battle is ongoing.";
  }
}

export default Battle;
