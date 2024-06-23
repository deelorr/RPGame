import { useMemo, createContext, useState } from 'react';
import PropTypes from 'prop-types';
import Player from '../classes/characters/Player';
import { NanoHealthPotion, EnergyBooster } from '../classes/items/Item';
import { IonAxe, PlasmaSword, QuantumRifle } from '../classes/items/weapons/Weapon';
import { CyberHelmet, NanoSuit, PhotonShield } from '../classes/items/armor/Armor';
import initialMap1 from './maps/Map1';
import initialMap2 from './maps/Map2';
import { switchMap as switchMapUtil } from '../components/GameUtils/GameUtils';

const GameContext = createContext();

export const GameProvider = ({ children }) => {

    const [maps] = useState([initialMap1, initialMap2]);
    const [currentMapIndex, setCurrentMapIndex] = useState(0);
    
    const [gameStarted, setGameStarted] = useState(false);
    const [renderTrigger, setRenderTrigger] = useState(false);

    const [log, setLog] = useState([]);

    const [inBattle, setInBattle] = useState(false);
    const [battle, setBattle] = useState(null);
    const [enemy, setEnemy] = useState(null);

    const [player, setPlayer] = useState(new Player("Ally", 150, 10, "Teleport Strike"));
    const [playerPosition, setPlayerPosition] = useState({ x: 3, y: 7 });

    const [inventory, setInventory] = useState([]);
    const [storeOpen, setStoreOpen] = useState(false);
    const [storeInventory, setStoreInventory] = useState([
        new NanoHealthPotion(),
        new NanoHealthPotion(),
        new EnergyBooster(),
        new IonAxe(),
        new PlasmaSword(),
        new QuantumRifle(),
        new CyberHelmet(),
        new NanoSuit(),
        new PhotonShield()
    ]);

    const switchMap = switchMapUtil(setCurrentMapIndex, setPlayerPosition);

    const values = useMemo(() => ({
        map: maps[currentMapIndex],
        switchMap,
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
        renderTrigger,
        setRenderTrigger,
        gameStarted,
        setGameStarted,
        inventory,
        setInventory,
        player,
        setPlayer,
        playerPosition,
        setPlayerPosition,
        currentMapIndex
    }), [switchMap, maps, currentMapIndex, log, inBattle, battle, storeOpen, enemy, storeInventory, renderTrigger, gameStarted, inventory, player, playerPosition]);

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
