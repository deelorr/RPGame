import { useContext } from 'react';
import GameContext from '../../contexts/GameContext';
import { randomInt } from '../GameUtils/GameUtils';
import PropTypes from 'prop-types';
import './Debug.css';
import Enemy from '../../classes/characters/enemies/Enemy';

const Debug = ({ player, playerPosition, addGold }) => {
  const { map, toggleRenderTrigger } = useContext(GameContext);


  const generateEnemy = () => {
    const enemy = new Enemy('Goblin', 100, 15, 'Water');
    const x = randomInt(0, map.width - 1);
    const y = randomInt(0, map.height - 1);

    console.log('Generating enemy at position:', { x, y });
    console.log('Enemy details:', enemy);

    // Ensure map has a placeObject method and it works correctly
    if (map.placeObject) {
      map.placeObject(enemy, x, y);
      console.log('Enemy placed on the map:', map.grid[y][x]);
      console.log(y, x)
      toggleRenderTrigger();
    } else {
      console.error('map.placeObject is not a function');
    }
  };


  return (
    <div className='debug'>
      <span className='debug-title'><h5>DEBUG MENU</h5></span>
      <div className='debug-buttons'>
        <button onClick={() => console.log(player.inventory)}>Check Inventory</button>
        <button onClick={() => console.log(player)}>Check Player</button>
        <button onClick={addGold}>Add 100 Gold</button>
        <button onClick={generateEnemy}>Generate Enemy</button>
      </div>
      <div className='debug-stats'>
        <h5>Player Position: X:{playerPosition.x}, Y:{playerPosition.y}</h5>
      </div>
    </div>
  );
};

Debug.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string.isRequired,
    hp: PropTypes.number.isRequired,
    dmg: PropTypes.number.isRequired,
    inventory: PropTypes.array.isRequired,
    equippedWeapon: PropTypes.shape({
      name: PropTypes.string,
    }),
    equippedArmor: PropTypes.shape({
      name: PropTypes.string,
    }),
    // addItem: PropTypes.func.isRequired,
    useItem: PropTypes.func.isRequired,
    attack: PropTypes.func.isRequired,
    takeDmg: PropTypes.func.isRequired,
    useSpecial: PropTypes.func.isRequired,
  }).isRequired,
  playerPosition: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  addGold: PropTypes.func.isRequired,
};

export default Debug;
