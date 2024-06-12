import './App.css';
import { PlayerProvider } from './contexts/PlayerContext';
import { InventoryProvider } from './contexts/InventoryContext';
import { GameProvider } from './contexts/GameContext';
// import IntroScreen from './components/IntroScreen/IntroScreen';
import GameScreen from './components/GameScreen/GameScreen';
// import GameContext from './contexts/GameContext';
// import { useContext } from 'react';

const App = () => {
  
  return (
    <GameProvider>
      <PlayerProvider>
        <InventoryProvider>
          <GameScreen />
        </InventoryProvider>
      </PlayerProvider>
    </GameProvider>
  );
};

// const MainApp = () => {

//   const { gameStarted, handleStartGame } = useContext(GameContext);

//   return (
//     <div>
//       {!gameStarted ? (
//         <IntroScreen onStart={handleStartGame} />
//       ) : (
//         <GameScreen />
//       )}
//     </div>
//   );
// };

export default App;
