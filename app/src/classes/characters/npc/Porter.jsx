import NPC from './NPC';

class Porter extends NPC {
    constructor(
        name='Porter', 
        hp=100, 
        dmg=10) {
        super(name, hp, dmg);
    }
}

export default Porter;