import { useContext, useEffect } from 'react';
import useActions from '../GameUtils/useActions';
import useMovement from '../GameUtils/useMovement';
import PlayerContext from '../../contexts/PlayerContext';
import InventoryContext from '../../contexts/InventoryContext';
import GameContext from '../../contexts/GameContext';
import StatBox from '../StatBox/StatBox';
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
        inBattle, 
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
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return (
        <>
            <div className='gameScreen'>
                {!storeOpen && (
                    <div className='firstDiv'>
                        <StatBox 
                            player={player} 
                            enemy={enemy} 
                            inBattle={inBattle} 
                        />
                        <BattleScreen 
                            player={player} 
                            enemy={enemy} 
                            onEndBattle={handleEndBattle} 
                        />  
                        <Inventory 
                            player={player} 
                            inventory={inventory} 
                            handleAction={handleAction} 
                        />
                    </div>
                )}
                {storeOpen && (
                    <div className='firstDiv'>
                        <StatBox 
                            player={player} 
                            enemy={enemy} 
                            inBattle={inBattle} 
                        />
                        <Store 
                            storeInventory={storeInventory} 
                            handleBuyItem={(item) => handleBuyItem(item, player, updateLog, setInventory, setStoreInventory, setLog)} 
                            closeStore={() => closeStore(setStoreOpen, updateLog, setLog)} 
                        /> 
                        <Inventory 
                            player={player} 
                            inventory={inventory} 
                            handleAction={handleAction}
                        />
                    </div>
                )}
                <div className='middleDiv'>   
                    <Grid 
                        map={map} 
                        playerPosition={playerPosition} 
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
