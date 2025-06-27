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
    // Warn in ALL environments if value is not string
    // eslint-disable-next-line no-console
    console.warn("Square received object as value! Rendering empty cell. Value was:", value);
    // For diagnostics, also try to extract inner value field
    if ("value" in value && (value.value === "X" || value.value === "O" || value.value === "")) {
      displayValue = value.value;
      // eslint-disable-next-line no-console
      console.warn("Square: used .value field from object for displayValue:", displayValue);
    } else if ("symbol" in value && (value.symbol === "X" || value.symbol === "O" || value.symbol === "")) {
      displayValue = value.symbol;
      // eslint-disable-next-line no-console
      console.warn("Square: used .symbol field from object for displayValue:", displayValue);
    } else if ("player" in value && (value.player === "X" || value.player === "O")) {
      displayValue = value.player;
      // eslint-disable-next-line no-console
      console.warn("Square: used .player field from object for displayValue:", displayValue);
    } else {
      displayValue = "";
    }
  } else {
    displayValue = "";
  }
  // Log what will actually display
  // eslint-disable-next-line no-console
  console.log("Square displayValue:", displayValue, "for input value:", value);
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
