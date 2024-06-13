import { useContext } from 'react';
import PropTypes from 'prop-types';
import GameContext from '../../contexts/GameContext';
import useActions from '../GameUtils/useActions';
import './BattleScreen.css';


const BattleScreen = () => {
  const { player, enemy, inBattle, setInBattle, setLog } = useContext(GameContext);

  const handleAction = useActions();

  const updateLog = (message) => {
    setLog((prevLog) => [...prevLog, message]);
  };

  const handleRun = () => {
    updateLog(`${player.name} ran away!`);
    setInBattle(false);
  };

  return (
    <>
      <div className="battle-screen">
        
        <div className="playerStats">
          <p>Player: {player.name}</p>
          <p>HP: {player.hp}/{player.maxHp}</p>
          <p>Damage: {player.dmg}</p>
          <p>Special: {player.special}</p>
          <p>Gold: {player.gold}</p>
          <div className="battleButtons">
            <button className='runBtn' onClick={handleRun}>Run</button>
            <button className='attackBtn' onClick={() => handleAction('attack')}>Attack</button>
            <button className='specialBtn' onClick={() => handleAction('special')}>Special</button>
          </div>
        </div>
      {inBattle && enemy ? (
        <>
        <span><p>VS</p></span>
        <div className='enemyStats'>
          <p>Enemy: {enemy.name}</p>
          <p>HP: {enemy.hp}/{enemy.maxHp}</p>
          <p>Damage: {enemy.dmg}</p>
          <p>Weakness: {enemy.weakness}</p>
        </div>
        </>
      ) : (
        <div className='enemyStats'>
          <p>No enemy</p>
        </div>
      )}
    </div>
    </>
  );
};

BattleScreen.propTypes = {
  player: PropTypes.object.isRequired,
  enemy: PropTypes.object,
};

export default BattleScreen;
