import "./App.css";
import { useState } from "react";
import { Game } from "./components/Game";

function App() {
  const [gameCondition, setGameCondition] = useState({
    boardSize: 3,
    winningCondition: 3,
  });
  const handleBoardSizeChange = (e) => {
    setGameCondition({ ...gameCondition, boardSize: +e.target.value || 3 });
  };
  const handleWinningConditionChange = (e) => {
    if (+e.target.value > gameCondition.boardSize) {
      alert("Winning condition cannot be greater than board size");
      return;
    }
    setGameCondition({
      ...gameCondition,
      winningCondition: +e.target.value || 3,
    });
  };

  return (
    <div className="App">
      <div className="form-field">
        <div className="size-field">
          <label>Board Size :</label>
          <input
            type="number"
            min="3"
            value={gameCondition.boardSize}
            onChange={handleBoardSizeChange}
          />{" "}
          x{gameCondition.boardSize}
        </div>
        <div className="condition-field">
          <label>| Winning rule :</label>
          <input
            type="number"
            min="3"
            value={gameCondition.winningCondition}
            onChange={handleWinningConditionChange}
          />{" "}
          in a row
        </div>
      </div>
      <Game
        size={gameCondition.boardSize}
        rule={gameCondition.winningCondition}
      />
    </div>
  );
}

export default App;
