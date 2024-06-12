import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
// import Item from '../classes/items/Item';
// import Weapon from '../classes/items/weapons/Weapon';
// import Armor from '../classes/items/armor/Armor';
import { NanoHealthPotion, EnergyBooster } from '../classes/items/Item';
import { IonAxe, PlasmaSword, QuantumRifle } from '../classes/items/weapons/Weapon';
import { CyberHelmet, NanoSuit, PhotonShield } from '../classes/items/armor/Armor';

const InventoryContext = createContext();

const initialInventory = [];
const initialStoreInventory = [
    new NanoHealthPotion(),
    new EnergyBooster(),
    new IonAxe(),
    new PlasmaSword(),
    new QuantumRifle(),
    new CyberHelmet(),
    new NanoSuit(),
    new PhotonShield()
];

const InventoryProvider = ({ children }) => {
    const [inventory, setInventory] = useState(initialInventory);
    const [storeInventory, setStoreInventory] = useState(initialStoreInventory);

    const addItemToInventory = (item) => {
        setInventory((prevInventory) => [...prevInventory, item]);
    };

    const removeItemFromInventory = (itemName) => {
        setInventory((prevInventory) => prevInventory.filter(item => item.name !== itemName));
    };

    const values = {
        inventory,
        setInventory,
        storeInventory,
        setStoreInventory,
        addItemToInventory,
        removeItemFromInventory
    };

    return (
        <InventoryContext.Provider value={ values }>
            {children}
        </InventoryContext.Provider>
    );
};

InventoryProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { InventoryProvider };
export default InventoryContext;
