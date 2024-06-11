import Character from '../Character';

class Enemy extends Character {
    constructor(name, hp, dmg, weakness) {
        super(name, hp, dmg);
        this.weakness = weakness;
    }

    talk() {
        console.log(`I am ${this.name}. Fear me!`);
        return `I am ${this.name}. Fear me!`;
    }

    showWeakness() {
        console.log(`${this.name} is weak to ${this.weakness}!`);
        return `${this.name} is weak to ${this.weakness}!`;
    }
}

export default Enemy;