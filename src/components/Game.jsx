import { useState } from "react";
import { Board } from "./Board";
export const Game = (props) => {
  const [state, setState] = useState({
    history: [
      {
        squares: Array(props.size * props.size).fill(null),
      },
    ],
    stepNumber: 0,
    xIsNext: true,
  });

  const [sortASC, setSortASC] = useState(true);

  const [winner, line] = calculateWinner(
    state.history[state.stepNumber].squares,
    props.size
  );

  const handleClick = (i) => {
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares, props.size)[0] || squares[i]) {
      return;
    }
    squares[i] = state.xIsNext ? "X" : "O";
    setState({
      history: history.concat([
        {
          squares: squares,
          location: i,
          isX: state.xIsNext,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext,
    });
  };

  const jumpTo = (step) => {
    setState({
      ...state,
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={state.history[state.stepNumber].squares}
          onClick={(i) => handleClick(i)}
          size={props.size}
          boldLine={line}
        />
      </div>
      <div className="game-info">
        <div>
          {winner
            ? "Winner: " + winner
            : "Next player: " + (state.xIsNext ? "X" : "O")}
        </div>
        <div>
          Sort
          <button onClick={() => setSortASC(!sortASC)}>
            {sortASC ? "ASC" : "DSC"}
          </button>
        </div>
        <ol className={`${sortASC ? "" : "flex-reverse"}`}>
          {state.history.map((step, move) => {
            const desc = move
              ? "Go to move #" +
                move +
                " " +
                (step.isX ? "X" : "O") +
                `(${step.location % props.size},${Math.floor(
                  step.location / props.size
                )})`
              : "Go to game start";
            return (
              <li
                key={move}
                className={`history-button ${
                  move === state.stepNumber ? "history-selected" : " "
                }`}
              >
                <button onClick={() => jumpTo(move)}>{desc}</button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

function calculateWinner(squares, size) {
  const winningLines = [
    ["X", "X", "X", "X", "X"],
    ["O", "O", "O", "O", "O"],
  ];
  for (let i = 0; i < squares.length; i++) {
    if (squares[i]) {
      const lines = getLines(i, size);
      for (let j = 0; j < lines.length; j++) {
        let line = lines[j];
        let lineValues = [];
        for (let k = 0; k < line.length; k++) {
          lineValues.push(squares[line[k]]);
        }
        if (winningLines.find((l) => arrayCompare(l, lineValues))) {
          return [squares[i], line];
        }
      }
    }
  }

  return [null, null];
}

const getLines = (pos, size) => {
  let lines = [];
  if (getHorizontalLine(pos, size).length === 5)
    lines.push(getHorizontalLine(pos, size));
  if (getVerticalLine(pos, size).length === 5)
    lines.push(getVerticalLine(pos, size));
  if (getDiagonalLine(pos, size).length === 5)
    lines.push(getDiagonalLine(pos, size));
  if (getReverseDiagonalLine(pos, size).length === 5)
    lines.push(getReverseDiagonalLine(pos, size));
  return lines;
};

const getHorizontalLine = (pos, size) => {
  let line = [];
  for (let i = 0; i < 5; i++) {
    if ((pos % size) + i < size) {
      line.push(pos + i);
    }
  }
  return line;
};

const getVerticalLine = (pos, size) => {
  let line = [];
  for (let i = 0; i < 5; i++) {
    if (Math.floor((pos + i * size) / size) < size) {
      line.push(pos + i * size);
    }
  }
  return line;
};

const getDiagonalLine = (pos, size) => {
  let line = [];
  for (let i = 0; i < 5; i++) {
    if ((pos % size) + i < size && Math.floor((pos + i * size) / size) < size) {
      line.push(pos + i * size + i);
    }
  }
  return line;
};

const getReverseDiagonalLine = (pos, size) => {
  let line = [];
  for (let i = 0; i < 5; i++) {
    if ((pos % size) - i > 0 && Math.floor((pos + i * size) / size) < size) {
      line.push(pos + i * size - i);
    }
  }
  return line;
};

const arrayCompare = (arr1, arr2) => {
  return (
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index])
  );
};
