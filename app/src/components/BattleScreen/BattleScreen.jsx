import { useContext } from 'react';
import PropTypes from 'prop-types';
import GameContext from '../../contexts/GameContext';
import PlayerContext from '../../contexts/PlayerContext';
import useActions from '../GameUtils/useActions';
import './BattleScreen.css';


const BattleScreen = () => {
  const { player } = useContext(PlayerContext);
  const { enemy, inBattle, setInBattle, setLog } = useContext(GameContext);

  const handleAction = useActions();

  const updateLog = (message) => {
    setLog((prevLog) => [...prevLog, message]);
  };

  const handleRun = () => {
    updateLog(`${player.name} ran away!`);
    setInBattle(false);
  };

  return (
      <div className="battle-info">
      <h2>BattleScreen</h2>
      <img src={player.sprite} alt="Ally" />
      <p>Player: {player.name} (HP: {player.hp})</p>
      {inBattle && enemy ? (
        <div>
        <img src={enemy.sprite} alt="Enemy" />
        <p>Enemy: {enemy.name} (HP: {enemy.hp})</p>
        </div>
      ) : (
        <p>Enemy: No enemy</p>
      )}
      <div className="battle-actions">
        <button onClick={handleRun}>Run</button>
        <button className='attackBtn' onClick={() => handleAction('attack')}>Attack</button>
        <button className='specialBtn' onClick={() => handleAction('special')}>Special</button>
      </div>
    </div>
  );
};

BattleScreen.propTypes = {
  player: PropTypes.object.isRequired,
  enemy: PropTypes.object,
};

export default BattleScreen;
