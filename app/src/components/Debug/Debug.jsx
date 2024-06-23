import { useContext, useState, useRef } from "react";
import GameContext from "../../contexts/GameContext";
import PropTypes from "prop-types";
import "./Debug.css";
import Enemy from "../../classes/characters/enemies/Enemy";

const Debug = ({ player, playerPosition, addGold }) => {
  const { map, renderTrigger, setRenderTrigger, currentMapIndex } =
    useContext(GameContext);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragRef = useRef(null);

  const toggleRenderTrigger = () => {
    setRenderTrigger(!renderTrigger);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - dragRef.current.x;
      const dy = e.clientY - dragRef.current.y;
      setPosition((prevPosition) => ({
        x: prevPosition.x + dx,
        y: prevPosition.y + dy,
      }));
      dragRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const generateEnemy = () => {
    const enemy = new Enemy("Goblin", 100, 15, "Water");
    const x = playerPosition.x + 2;
    const y = playerPosition.y;

    console.log("Generating enemy at position:", { x, y });
    console.log("Enemy details:", enemy);

    // Check if the tile at (x, y) is walkable
    const tileObject = map.grid[y][x];
    // Assuming map.grid[y][x] gives you the tile object
    if (tileObject && tileObject.walkable) {
      if (map.placeTile) {
        map.placeTile(enemy, x, y);
        console.log("Enemy placed on the map at:", { x, y });
        toggleRenderTrigger();
      } else {
        console.error("map.placeTile is not a function");
      }
    } else {
      console.warn(
        `Cannot place enemy at (${x}, ${y}): Tile is not walkable or does not exist.`
      );
    }
  };

  return (
    <div
      className="debug"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <span className="debug-title">
        <h5>DEBUG MENU</h5>
      </span>
      <div className="debug-buttons">
        <button onClick={() => console.log(player.inventory)}>
          Check Inventory
        </button>
        <button onClick={() => console.log(player)}>Check Player</button>
        <button onClick={addGold}>Add 100 Gold</button>
        <button onClick={generateEnemy}>Generate Enemy</button>
      </div>
      <div className="debug-stats">
        <h5>
          Player Position: X:{playerPosition.x}, Y:{playerPosition.y}
        </h5>
        <h5>Map Index: {currentMapIndex}</h5>
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
