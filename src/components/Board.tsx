import { Square } from './Square';
import { calculateWinner } from '../functions/calculateWinner';

interface BoardProps {
  xIsNext: boolean;
  squares: Array<string | null>;
  onPlay: (nextSquares: Array<string | null>) => void;
  winningSquares: number[];
}

export function Board({ xIsNext, squares, onPlay, winningSquares }: BoardProps) {
  function handleClick(i: number) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (squares.every(square => square !== null)) {
    status = "No winner: Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const boardRows = [];
  for (let i = 0; i < 3; i++) {
    boardRows.push(
      <div key={i} className="board-row">
        {Array.from({ length: 3 }, (_, j) => {
          const index = j + (i * 3);
          return (
            <Square
              key={index}
              value={squares[index]}
              onSquareClick={() => handleClick(index)}
              winning={winningSquares.includes(index)}
            />
          );
        })}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
}
