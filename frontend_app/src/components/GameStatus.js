import React from "react";

// PUBLIC_INTERFACE
function GameStatus({ nextPlayer, winner, isDraw }) {
  /**
   * Displays current game status/turn/result.
   * @param {string|null} nextPlayer - "X", "O", or null.
   * @param {string|null} winner - "X", "O", or null.
   * @param {boolean} isDraw - True if the game is drawn.
   */
  let statusText = "";
  if (winner) {
    statusText = `Winner: ${winner}`;
  } else if (isDraw) {
    statusText = "Draw!";
  } else {
    statusText = `Next turn: ${nextPlayer}`;
  }

  return (
    <div
      className="ttt-status"
      style={{
        fontWeight: "700",
        fontSize: "1.2rem",
        letterSpacing: "0.02em",
        margin: "18px 0 12px 0",
        color: "var(--text-primary)",
        minHeight: "1.4em"
      }}
      data-testid="ttt-status"
    >
      {statusText}
    </div>
  );
}

export default GameStatus;
