import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import Map from '../classes/Map';
import Player from '../classes/characters/Player';
import { NanoHealthPotion, EnergyBooster } from '../classes/items/Item';
import { IonAxe, PlasmaSword, QuantumRifle } from '../classes/items/weapons/Weapon';
import { CyberHelmet, NanoSuit, PhotonShield } from '../classes/items/armor/Armor';

const GameContext = createContext();

const initialMap = new Map(16, 11);

export const GameProvider = ({ children }) => {
    const [map, setMap] = useState(initialMap);
    const [renderTrigger, setRenderTrigger] = useState(false);
    const [log, setLog] = useState([]);
    const [inBattle, setInBattle] = useState(false);
    const [battle, setBattle] = useState(null);
    const [storeOpen, setStoreOpen] = useState(false);
    const [enemy, setEnemy] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);

    // new from inventory context

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

    const [storeInventory, setStoreInventory] = useState(initialStoreInventory);
    const [inventory, setInventory] = useState(initialInventory);

    const addItemToInventory = (item) => {
        setInventory((prevInventory) => [...prevInventory, item]);
    };

    const removeItemFromInventory = (itemName) => {
        setInventory((prevInventory) => prevInventory.filter(item => item.name !== itemName));
    }; 
    
    // new from inventory context

    // new from player context

    const initialPlayer = new Player("Ally", 150, 10, "Teleport Strike");
    const initialPlayerPosition = { x: 0, y: 0 };

    const [player, setPlayer] = useState(initialPlayer);
    const [playerPosition, setPlayerPosition] = useState(initialPlayerPosition);



    // new from player context

    const handleStartGame = () => {
        setGameStarted(true);
      };

    const toggleRenderTrigger = () => { setRenderTrigger(!renderTrigger); };

    // const [storeInventory, setStoreInventory] = useState([
    //     new Item("Potion", (target) => { target.hp += 50; }, true, 10, 2),
    //     new Weapon("Sword", null, 15, 50, 1),
    //     new Armor("Shield", null, 20, 50, 1)
    // ]);

    const updateLog = (message, setLog) => {
        setLog(prevLog => [...prevLog, message]);
    }
;

    const values = {
        map,
        setMap,
        log,
        setLog,
        inBattle,
        setInBattle,
        battle,
        setBattle,
        storeOpen,
        setStoreOpen,
        enemy,
        setEnemy,
        storeInventory,
        setStoreInventory,
        updateLog,
        renderTrigger,
        toggleRenderTrigger,
        gameStarted,
        setGameStarted,
        handleStartGame,
        inventory,
        setInventory,
        addItemToInventory,
        removeItemFromInventory,
        player,
        setPlayer,
        playerPosition,
        setPlayerPosition
    };

    return (
        <GameContext.Provider value={values}>
            {children}
        </GameContext.Provider>
    );
};

GameProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default GameContext;
