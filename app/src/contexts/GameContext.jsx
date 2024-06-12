import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import Map from '../classes/Map';
import Item from '../classes/items/Item';
import Weapon from '../classes/items/weapons/Weapon';
import Armor from '../classes/items/armor/Armor';

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

    const handleStartGame = () => {
        setGameStarted(true);
      };

    const toggleRenderTrigger = () => { setRenderTrigger(!renderTrigger); };

    const [storeInventory, setStoreInventory] = useState([
        new Item("Potion", (target) => { target.hp += 50; }, true, 10, 2),
        new Weapon("Sword", null, 15, 50, 1),
        new Armor("Shield", null, 20, 50, 1)
    ]);

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
        handleStartGame
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
