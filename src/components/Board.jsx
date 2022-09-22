import { Square } from "./Square";

export const Board = (props) => {
  const renderSquare = (i) => {
    return (
      <Square
        key={i}
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
        bold={props.boldLine && props.boldLine.includes(i)}
      />
    );
  };

  return Array(props.size)
    .fill(null)
    .map((_, i) => {
      return (
        <div key={i} className="board-row">
          {Array(props.size)
            .fill(null)
            .map((_, j) => {
              return renderSquare(i * props.size + j);
            })}
        </div>
      );
    });
};
