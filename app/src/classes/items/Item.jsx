class Item {
    constructor(name, useEffect, isConsumable, price, quantity = 1) {
        this.name = name;
        this.useEffect = useEffect;  // The function to execute on use
        this.isConsumable = isConsumable;
        this.price = price;
        this.quantity = quantity;
    }

    use(target) {
        if (typeof this.useEffect === 'function') {
            this.useEffect(target);  // Ensure this is called correctly
        } else {
            throw new Error(`No effect available for ${this.name}`);
        }
    }
}

class EnergyBooster extends Item {
    constructor() {
        super('Energy Booster', target => {
            target.speed += 10;
        }, true, 50);
    }
}

class NanoHealthPotion extends Item {
    constructor() {
        super('Nano Health Potion', target => {
            target.hp += 20;
        }, true, 20);
    }
}

export { EnergyBooster, NanoHealthPotion};
export default Item;
