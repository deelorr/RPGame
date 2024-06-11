import { useContext, useCallback, useEffect } from 'react';
import Enemy from '../../classes/characters/enemies/Enemy';
import Item from '../../classes/items/Item';
import Battle from '../../classes/Battle';
import { updateLog } from '../GameUtils/GameUtils';
import Porter from '../../classes/characters/npc/Porter';
import defeatMatt from '../../classes/quests/Act 1/defeatMatt';
import GameContext from '../../contexts/GameContext';
import PlayerContext from '../../contexts/PlayerContext';
import InventoryContext from '../../contexts/InventoryContext';

const useMovement = () => {
    const { setEnemy, inBattle, setInBattle, map, setLog, storeOpen, setStoreOpen } = useContext(GameContext);
    const { player, playerPosition, setPlayerPosition } = useContext(PlayerContext);
    const { setInventory } = useContext(InventoryContext);

    const handleItemEncounter = useCallback((item, x, y) => {
        updateLog(player.receiveItem(item), setLog);
        setInventory([...player.inventory]);
        map.removeItem(x, y);
    }, [player, setLog, setInventory, map]);

    const handleMove = useCallback((dx, dy) => {
        if (inBattle) {
            updateLog("You can't move during a battle!", setLog);
            return;
        }

        const newX = playerPosition.x + dx;
        const newY = playerPosition.y + dy;

        if (map.isValidPosition(newX, newY)) {
            setPlayerPosition({ x: newX, y: newY });
            const tileObject = map.getItem(newX, newY);

            if (tileObject) {
                if (tileObject instanceof Item) {
                    handleItemEncounter(tileObject, newX, newY);
                } else if (tileObject === "store") {
                    updateLog("You found a store!", setLog);
                    setStoreOpen(true);
                } else if (tileObject instanceof Porter) {
                    const questMessage = tileObject.giveQuest(defeatMatt, player);
                    updateLog(tileObject.talk(), setLog);
                    updateLog(questMessage, setLog);
                    defeatMatt.startQuest();
                } else if (tileObject instanceof Enemy) {
                    if (tileObject.name === 'Matt') {
                        defeatMatt.completeObjective(0);
                    }
                    updateLog(tileObject.talk(), setLog);
                    updateLog(tileObject.showWeakness(), setLog);
                    setEnemy(tileObject);
                    setInBattle(true);
                    const battle = new Battle(player, tileObject);
                    battle.start();
                }
            }
        }
    }, [inBattle, player, setEnemy, setInBattle, playerPosition, map, setPlayerPosition, setStoreOpen, setLog, handleItemEncounter]);

    const handleKeyDown = useCallback((event) => {
        if (inBattle || storeOpen) return;
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                handleMove(0, -1);
                break;
            case 'ArrowDown':
            case 's':
                handleMove(0, 1);
                break;
            case 'ArrowLeft':
            case 'a':
                handleMove(-1, 0);
                break;
            case 'ArrowRight':
            case 'd':
                handleMove(1, 0);
                break;
            default:
                break;
        }
    }, [inBattle, storeOpen, handleMove]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return handleMove;
};

export default useMovement;
