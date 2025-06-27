import React from "react";

// PUBLIC_INTERFACE
function Square({ value, onClick, highlight }) {
  /**
   * Square cell for the Tic Tac Toe board.
   * @param {string|null} value - The player's symbol ("X", "O", or null).
   * @param {function} onClick - Callback when the square is clicked.
   * @param {boolean} highlight - If true, highlights the square (e.g., for win).
   */
  return (
    <button
      className="ttt-square"
      onClick={onClick}
      style={{
        width: "72px",
        height: "72px",
        fontSize: "2rem",
        background: highlight ? "var(--text-secondary)" : "var(--bg-secondary)",
        border: "2px solid var(--border-color)",
        borderRadius: "8px",
        color: "var(--text-primary)",
        fontWeight: "600",
        cursor: value ? "default" : "pointer",
        transition: "background-color 0.15s",
        outline: "none",
        margin: "2px"
      }}
      disabled={Boolean(value)}
      aria-label={value ? `Square contains ${value}` : "Empty square"}
      data-testid="ttt-square"
    >
      {value}
    </button>
  );
}

export default Square;
