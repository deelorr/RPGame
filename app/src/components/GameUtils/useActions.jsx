import { useContext, useCallback } from 'react';
import { updateLog, removeEnemyFromMap } from '../GameUtils/GameUtils';
import Weapon from '../../classes/items/weapons/Weapon';
import Armor from '../../classes/items/armor/Armor';
import GameContext from '../../contexts/GameContext';

const useActions = () => {
    const { player, enemy, setEnemy, inBattle, setInBattle, setLog, map, setInventory } = useContext(GameContext);

    const handleBattleAction = useCallback((action) => {
        updateLog(action, setLog);
        if (enemy.hp <= 0) {
            setInBattle(false);
            removeEnemyFromMap(enemy, map);
            setEnemy(null);
        } else {
            updateLog(enemy.attack(player), setLog);
            if (player.hp <= 0) {
                updateLog("You have been defeated!", setLog);
                setInBattle(false);
            }
        }
    }, [enemy, map, player, setEnemy, setInBattle, setLog]);

    const handleItemAction = useCallback((item) => {
        if (item.isConsumable) {
            updateLog(player.useItem(item.name, player), setLog);
            setInventory([...player.inventory]);
        } else if (item instanceof Weapon) {
            updateLog(`Equipping weapon: ${item.name}`, setLog);
            player.equipWeapon(item);
        } else if (item instanceof Armor) {
            updateLog(`Equipping armor: ${item.name}`, setLog);
            player.equipArmor(item);
        }
    }, [player, setInventory, setLog]);

    const handleAction = useCallback((actionType, item) => {
        if (!inBattle) {
            if (actionType === 'useItem') {
                handleItemAction(item);
            } else {
                updateLog(`No enemy to ${actionType}!`, setLog);
            }
            return;
        }

        switch (actionType) {
            case 'attack':
                handleBattleAction(player.attack(enemy));
                break;
            case 'special':
                handleBattleAction(player.useSpecial(enemy));
                break;
            case 'useItem':
                handleItemAction(item);
                break;
            default:
                break;
        }
    }, [inBattle, handleBattleAction, handleItemAction, player, enemy, setLog]);

    return handleAction;
};

export default useActions;
