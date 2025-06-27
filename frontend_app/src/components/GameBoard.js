import React, { useState } from "react";
import Square from "./Square";
import GameStatus from "./GameStatus";
import ResetButton from "./ResetButton";

// Helper function to check winner
function calculateWinner(squares) {
  // Indices for all winning lines
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],  // Rows
    [0,3,6],[1,4,7],[2,5,8],  // Cols
    [0,4,8],[2,4,6]           // Diagonals
  ];
  for (let line of lines) {
    const [a,b,c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { winner: squares[a], line };
    }
  }
  return null;
}

// PUBLIC_INTERFACE
function GameBoard() {
  /**
   * GameBoard - 3x3 Tic Tac Toe grid and logic (standalone, local state for now).
   */

  // Demo initial state/hardcode for first render. Start with some moves
  const [squares, setSquares] = useState([
    "X", "O", "X",
    "O", "X", "",
    "", "O", ""
  ]);
  const [xIsNext, setXIsNext] = useState(true);

  // Winner logic (standalone)
  const win = calculateWinner(squares);
  const isDraw = !win && squares.every((val) => val);

  // Handle clicking a square (only active if game not finished)
  function handleClick(idx) {
    if (win || squares[idx]) return;
    const nextSquares = squares.slice();
    nextSquares[idx] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // Handle reset
  function handleReset() {
    setSquares(["", "", "", "", "", "", "", "", ""]);
    setXIsNext(true);
  }

  // Render grid 3x3
  function renderSquare(i) {
    const highlight =
      win && win.line.includes(i)
        ? true
        : false;
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => handleClick(i)}
        highlight={highlight}
      />
    );
  }

  return (
    <div
      className="ttt-board-wrapper"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
      data-testid="ttt-board-wrapper"
    >
      <GameStatus
        nextPlayer={xIsNext ? "X" : "O"}
        winner={win && win.winner}
        isDraw={isDraw}
      />
      <div
        className="ttt-board"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 72px)",
          gridTemplateRows: "repeat(3, 72px)",
          gap: "6px",
          background: "var(--bg-secondary)",
          borderRadius: "12px",
          boxShadow: "0 2px 14px rgba(0,0,0,0.06)",
          padding: "18px"
        }}
        data-testid="ttt-board"
      >
        {Array(9)
          .fill()
          .map((_, i) => renderSquare(i))}
      </div>
      <ResetButton onClick={handleReset} />
    </div>
  );
}
export default GameBoard;
