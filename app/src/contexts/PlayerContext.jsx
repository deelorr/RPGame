import { createContext, useState } from 'react';
import Player from '../classes/characters/Player'
import PropTypes from 'prop-types';

const PlayerContext = createContext();

const initialPlayer = new Player("Ally", 150, 10, "Teleport Strike");
const initialPlayerPosition = { x: 0, y: 0 };

const PlayerProvider = ({ children }) => {
    const [player, setPlayer] = useState(initialPlayer);
    const [playerPosition, setPlayerPosition] = useState(initialPlayerPosition);

    const values = {
        player,
        setPlayer,
        playerPosition,
        setPlayerPosition
    };

    return (
        <PlayerContext.Provider value={ values }>
            {children}
        </PlayerContext.Provider>
    );
};

PlayerProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { PlayerProvider };
export default PlayerContext;
