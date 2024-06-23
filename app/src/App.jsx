import { GameProvider } from "./contexts/GameContext";
import GameScreen from "./components/GameScreen/GameScreen";
import "./App.css";

const App = () => {
  return (
    <GameProvider>
      <GameScreen />
    </GameProvider>
  );
};

export default App;
