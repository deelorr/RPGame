import Item from '../Item';

class Armor extends Item {
    constructor(name, useEffect, armor, price, quantity = 1) {
        super(name, useEffect, false, price, quantity);
        this.armor = armor;
    }
}

class CyberHelmet extends Armor {
    constructor() {
        super('Cyber Helmet', target => {
            target.armor += this.armor;
        }, 5, 25);
    }
}
class NanoSuit extends Armor {
    constructor() {
        super('Nano Suit', target => {
            target.armor += this.armor;
        }, 10, 50);
    }
}

class PhotonShield extends Armor {
    constructor() {
        super('Photon Shield', target => {
            target.armor += this.armor;
        }, 15, 75);
    }
}

export { CyberHelmet, NanoSuit, PhotonShield};
export default Armor;