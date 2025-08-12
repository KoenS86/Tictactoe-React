import { useState } from "react";
import { Board } from "../components/Board";
import { ToggleButton } from "../components/ToggleButton";
import { calculateWinner } from "../functions/calculateWinner";

export function App() {
  const [history, setHistory] = useState<Array<Array<string | null>>>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>("descending");

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: Array<string | null>) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const winner = calculateWinner(currentSquares);
  let winningSquares: number[] = [];

  if (winner && currentSquares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const winningLine = lines.find((line) =>
      line.every((square) => currentSquares[square] === winner)
    );
    if (winningLine) {
      winningSquares = winningLine;
    }
  }

  const moves = history
    .map((squares, move) => {
      let description: string;
      if (move > 0) {
        const previousSquares = history[move - 1];
        const index = squares.findIndex(
          (square, i) => square !== previousSquares[i]
        );
        const row = Math.floor(index / 3) + 1;
        const col = (index % 3) + 1;
        description = `Go to move #${move} at (${row}, ${col})`;
      } else {
        description = "Go to game start";
      }

      return move === currentMove ? (
        <li key={move}>You are at move #{move + 1}</li>
      ) : (
        <li key={move}>
          <button onClick={() => setCurrentMove(move)}>{description}</button>
        </li>
      );
    })
    .slice()
    .sort((a, b) => {
      const moveA = parseInt(a.key as string, 10);
      const moveB = parseInt(b.key as string, 10);
      return sortOrder === "descending" ? moveA - moveB : moveB - moveA;
    });

  return (
    <>
      <div className="game-title">Tic Tac Toe</div>
      <div className="game">
        <div className="game-board">
          <Board
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            winningSquares={winningSquares}
          />
        </div>
        <div className="game-info">
          <ToggleButton sortOrder={sortOrder} setSortOrder={setSortOrder} />
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}
