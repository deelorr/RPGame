import Character from '../Character';

class NPC extends Character {
    constructor(name, hp, dmg) {
        super(name, hp, dmg);
    }

    talk() {
        return `Hello, my name is ${this.name}. Nice to meet you!`;
    }

    giveQuest(quest, player) {
        if (player.quests.includes(quest)) {
            return `You already have the quest: ${quest.name}`;
        } else {
            player.quests.push(quest);
            return `${this.name} gives you the quest: ${quest.name}`;
        }
    }
}

export default NPC;