import React from "react";

/**
 * Square cell for the Tic Tac Toe board.
 * @param {string|null|object} value - The player's symbol ("X", "O", or empty/unknown).
 * @param {function} onClick - Callback when the square is clicked.
 * @param {boolean} highlight - If true, highlights the square (e.g., for win).
 */
function Square({ value, onClick, highlight }) {
  // Defensive rendering: Only show 'X', 'O', or empty (never render an object)
  let displayValue = "";
  if (typeof value === "string") {
    displayValue = value === "X" || value === "O" ? value : "";
  } else if (value && typeof value === "object") {
    // Warn in development if value is not string
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.warn("Square received object as value! Will render empty cell.", value);
    }
    displayValue = "";
  } else {
    displayValue = "";
  }
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
        cursor: displayValue ? "default" : "pointer",
        transition: "background-color 0.15s",
        outline: "none",
        margin: "2px"
      }}
      disabled={Boolean(displayValue)}
      aria-label={displayValue ? `Square contains ${displayValue}` : "Empty square"}
      data-testid="ttt-square"
    >
      {displayValue}
    </button>
  );
}

export default Square;
