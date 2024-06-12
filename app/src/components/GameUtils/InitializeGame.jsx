import Item from '../../classes/items/Item';
import Porter from '../../classes/characters/npc/Porter';
import Matt from '../../classes/characters/enemies/Matt';
import { updateLog, randomInt } from '../GameUtils/GameUtils';

export const initializeGame = (map, setLog) => {
    const potion = new Item("Potion", (target) => {
        target.hp += 50;
    }, true, 10, 1);

    const dmgPotion = new Item("Damage Potion", (target) => {
        target.dmg += 50;
    }, true, 10, 1);

    map.placeObject(new Matt, randomInt(0, map.width), randomInt(0, map.height));
    map.placeObject(potion, randomInt(0, map.width), randomInt(0, map.height));
    map.placeObject(dmgPotion, randomInt(0, map.width), randomInt(0, map.height));
    map.placeObject("store", randomInt(0, map.width), randomInt(0, map.height));
    map.placeObject(new Porter, randomInt(0, map.width), randomInt(0, map.height));
    updateLog("Game started!", setLog);

};

export default initializeGame;
