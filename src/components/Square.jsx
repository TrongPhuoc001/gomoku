export const Square = (props) => {
  return (
    <button
      className={`square ${props.bold ? "bold" : ""}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};
