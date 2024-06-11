export function updateLog(log, setLog) {
    setLog((prevLogs) => [...prevLogs, log]);
}

export const removeEnemyFromMap = (enemy, map) => {
    const enemyPosition = map.findItemPosition(enemy);
    if (enemyPosition) {
        map.removeItem(enemyPosition.x, enemyPosition.y);
    }
}

export const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);

export const handleBuyItem = (item, player, updateLog, setInventory, setStoreInventory, setLog) => {
    if (player.gold >= item.price) {
        player.gold -= item.price;
        player.receiveItem(item);
        updateLog(`Bought ${item.name} for ${item.price} gold.`, setLog);
        setInventory([...player.inventory]);
        setStoreInventory((prevStoreInventory) => {
            const itemIndex = prevStoreInventory.findIndex((storeItem) => storeItem.name === item.name);
            if (itemIndex !== -1) {
                const updatedStoreInventory = [...prevStoreInventory];
                if (updatedStoreInventory[itemIndex].quantity > 1) {
                    updatedStoreInventory[itemIndex].quantity -= 1;
                } else {
                    updatedStoreInventory.splice(itemIndex, 1);
                }
                return updatedStoreInventory;
            }
            return prevStoreInventory;
        });
    } else {
        updateLog("Not enough gold.", setLog);
    }
}

export const closeStore = (setStoreOpen, updateLog, setLog) => {
    setStoreOpen(false);
    updateLog("Left the store.", setLog);
}

export const addGold = (player, updateLog, setLog) => {
    player.gold += 100;
    updateLog("Added 100 gold.", setLog);
}
