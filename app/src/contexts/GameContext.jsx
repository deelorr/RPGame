import { useMemo, createContext, useState } from 'react';
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
    const [player, setPlayer] = useState(new Player("Ally", 150, 10, "Teleport Strike"));
    const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
    const [inventory, setInventory] = useState([]);
    const [storeInventory, setStoreInventory] = useState([
        new NanoHealthPotion(),
        new EnergyBooster(),
        new IonAxe(),
        new PlasmaSword(),
        new QuantumRifle(),
        new CyberHelmet(),
        new NanoSuit(),
        new PhotonShield()
    ]);

    const addItemToInventory = (item) => {
        setInventory((prevInventory) => [...prevInventory, item]);
    };

    const removeItemFromInventory = (itemName) => {
        setInventory((prevInventory) => prevInventory.filter(item => item.name !== itemName));
    };

    const handleStartGame = () => {
        setGameStarted(true);
    };

    const updateLog = (message) => {
        setLog(prevLog => [...prevLog, message]);
    };

    const values = useMemo(() => ({
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
        setRenderTrigger,
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
    }), [map, log, inBattle, battle, storeOpen, enemy, storeInventory, renderTrigger, gameStarted, inventory, player, playerPosition]);

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
