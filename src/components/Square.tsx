interface SquareProps {
  value: string | null;
  onSquareClick: () => void;
  winning: boolean;
}

export function Square({ value, onSquareClick, winning }: SquareProps) {
  const winningClass = winning ? "win" : "";
  const colorClass = value === "X" ? "x-color" : value === "O" ? "o-color" : "";
  return (
    <button className={`square ${winningClass} ${colorClass}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}
