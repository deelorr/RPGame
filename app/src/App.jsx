import { GameProvider } from './contexts/GameContext';
import GameScreen from './components/GameScreen/GameScreen';
import './App.css';
// import IntroScreen from './components/IntroScreen/IntroScreen';
// import GameContext from './contexts/GameContext';
// import { useContext } from 'react';

const App = () => {
  
  return (
    <GameProvider>
          <GameScreen />
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
