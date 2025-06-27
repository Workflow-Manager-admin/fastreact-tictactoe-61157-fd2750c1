import React, { useEffect, useState } from "react";
import Square from "./Square";
import GameStatus from "./GameStatus";
import ResetButton from "./ResetButton";
import {
  startGame,
  getGameState,
  makeMove,
  resetGame,
} from "../api";

// PUBLIC_INTERFACE
function GameBoard() {
  /**
   * GameBoard - 3x3 Tic Tac Toe grid and backend state.
   * Wires up all backend_api endpoints for gameplay, state, and error handling.
   */

  const [squares, setSquares] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [highlightLine, setHighlightLine] = useState([]);

  // Fetch latest state on load
  useEffect(() => {
    // Try to fetch current game state, else start a new game
    (async () => {
      setLoading(true);
      setError("");
      try {
        let data;
        try {
          data = await getGameState();
        } catch (e) {
          // No game in progress? Try to start one
          data = await startGame();
        }
        updateGameState(data);
      } catch (e) {
        setError("Failed to load game. Backend unavailable?");
      }
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, []);

  // Update all state fields from backend response obj
  function updateGameState(data) {
    // Defensive: make sure board is an array of strings, not objects
    let cleanBoard = Array.isArray(data.board)
      ? data.board.map(cell => (typeof cell === "string" ? cell : ""))
      : Array(9).fill("");
    setSquares(cleanBoard);
    setCurrentPlayer(data.current_player ?? "X");
    setWinner(data.winner);
    setIsDraw(data.is_draw);
    setHighlightLine(data.win_line || []);
  }

  // Handle clicking a square (POST move)
  async function handleClick(idx) {
    if (loading || winner || isDraw || squares[idx]) return;
    setLoading(true);
    setError("");
    try {
      const data = await makeMove(idx);
      updateGameState(data);
    } catch (e) {
      setError(e.message || "Move failed.");
    }
    setLoading(false);
  }

  // Handle game reset
  async function handleReset() {
    setLoading(true);
    setError("");
    try {
      const data = await resetGame();
      updateGameState(data);
    } catch (e) {
      setError("Reset failed.");
    }
    setLoading(false);
  }

  // Render square (highlight if part of win_line)
  function renderSquare(i) {
    const highlight =
      Array.isArray(highlightLine) && highlightLine.includes(i);
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
        nextPlayer={winner || isDraw ? null : currentPlayer}
        winner={winner}
        isDraw={isDraw}
      />
      {error && (
        <div style={{ color: "#e74c3c", fontWeight: 500, marginBottom: 8 }}>
          {error}
        </div>
      )}
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
          padding: "18px",
          opacity: loading ? 0.7 : 1,
          pointerEvents: loading ? "none" : undefined,
        }}
        data-testid="ttt-board"
      >
        {Array(9)
          .fill()
          .map((_, i) => renderSquare(i))}
      </div>
      <ResetButton onClick={handleReset} />
      {loading && (
        <div style={{ fontSize: "0.88em", color: "#888", marginTop: 10 }}>
          Loading...
        </div>
      )}
    </div>
  );
}
export default GameBoard;
