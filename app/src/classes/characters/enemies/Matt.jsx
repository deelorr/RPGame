import Enemy from './Enemy';

class Matt extends Enemy {
    constructor(
        name='Matt', 
        hp=150, 
        dmg=10) {
        super(name, hp, dmg);
        this.weakness = 'fire';
        this.sprite = '/Matt.png'
    }
}

export default Matt;