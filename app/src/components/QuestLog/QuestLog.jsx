import { useContext } from "react";
import "./QuestLog.css";
import GameContext from "../../contexts/GameContext";

const QuestLog = () => {
  const { player } = useContext(GameContext);

  if (!player) {
    return <p>Loading player data...</p>;
  }

  return (
    <>
      <div className="questContainer">
        <h2>Quest Log</h2>
        <div className="questLog">
          {player.quests.length === 0 ? (
            <p>No active quests</p>
          ) : (
            <ul>
              {player.quests.map((quest, index) => (
                <li
                  key={index}
                  className={`quest ${quest.status.toLowerCase()}`}
                >
                  <h3>{quest.name}</h3>
                  <p>{quest.description}</p>
                  <p>Status: {quest.status}</p>
                  <ul>
                    {quest.objectives.map((objective, i) => (
                      <li
                        key={i}
                        className={objective.completed ? "completed" : ""}
                      >
                        {objective.description}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default QuestLog;
