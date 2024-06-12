import { useContext, useEffect } from 'react';
import useActions from '../GameUtils/useActions';
import useMovement from '../GameUtils/useMovement';
import PlayerContext from '../../contexts/PlayerContext';
import InventoryContext from '../../contexts/InventoryContext';
import GameContext from '../../contexts/GameContext';
import LogBox from '../LogBox/LogBox';
import Inventory from '../Inventory/Inventory';
import Store from '../Store/Store';
import QuestLog from '../QuestLog/QuestLog';
import BattleScreen from '../BattleScreen/BattleScreen';
import Debug from '../Debug/Debug';
import Grid from '../Grid/Grid';
import { initializeGame } from '../GameUtils/InitializeGame';
import { handleBuyItem, closeStore, addGold, updateLog } from '../GameUtils/GameUtils';
import './GameScreen.css';

export default function GameScreen() {
    const { 
        player, 
        enemy, 
        setEnemy, 
        playerPosition } = useContext(PlayerContext);
    const { 
        inventory, 
        setInventory, 
        storeInventory, 
        setStoreInventory } = useContext(InventoryContext);
    const { 
        map, 
        log, 
        setLog,
        setInBattle, 
        storeOpen, 
        setStoreOpen } = useContext(GameContext);

    const handleEndBattle = () => {
        setInBattle(false);
        setEnemy(null);
    };

    useMovement();
    const handleAction = useActions();

    useEffect(() => {
        initializeGame(map, setLog);
    }, [map, setLog]);

    return (
        <>
            <div className='gameScreen'>
                {!storeOpen && (
                    <div className='firstDiv'>
                        <Inventory 
                            player={player} 
                            inventory={inventory} 
                            handleAction={handleAction} 
                        />
                        <div className='placeholder'>
                            <h2>Placeholder</h2>
                        </div>
                    </div>
                )}
                {storeOpen && (
                    <div className='firstDiv'>
                        <Inventory 
                            player={player} 
                            inventory={inventory} 
                            handleAction={handleAction}
                        />
                        <Store 
                            storeInventory={storeInventory} 
                            handleBuyItem={(item) => handleBuyItem(item, player, updateLog, setInventory, setStoreInventory, setLog)} 
                            closeStore={() => closeStore(setStoreOpen, updateLog, setLog)} 
                        />
                    </div>
                )}
                <div className='middleDiv'>   
                    <Grid 
                        map={map} 
                        playerPosition={playerPosition} 
                    />
                    <BattleScreen 
                            player={player} 
                            enemy={enemy} 
                            onEndBattle={handleEndBattle} 
                    />  
                    <Debug 
                        player={player} 
                        playerPosition={playerPosition} 
                        addGold={() => addGold(player, updateLog, setLog)} 
                    />
                </div>
                <div className='thirdDiv'>
                    <LogBox log={log} />
                    <QuestLog />
                </div>
            </div>
        </>
    );
}
