import PropTypes from 'prop-types';
import './IntroScreen.css';

const IntroScreen = ({ onStart }) => {
  return (
    <div className="intro-screen">
        <h1 className="game-title">Welcome to RPGame!</h1>
        <p className="game-description">
          In this game, you will live the life of 
          Ally and go on an adventure.
        </p>
        <button className="start-button" onClick={onStart}>
          Start RPGame
        </button>
    </div>
  );
};

export default IntroScreen;

IntroScreen.propTypes = {
    onStart: PropTypes.func.isRequired,
    };

