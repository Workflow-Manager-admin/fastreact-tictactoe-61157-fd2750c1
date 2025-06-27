import React from "react";

// PUBLIC_INTERFACE
function ResetButton({ onClick }) {
  /**
   * Button to reset/restart the Tic Tac Toe game.
   * @param {function} onClick - Callback for reset action.
   */
  return (
    <button
      className="ttt-reset-btn"
      style={{
        background: "var(--button-bg)",
        color: "var(--button-text)",
        padding: "10px 28px",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold",
        fontSize: "1rem",
        margin: "16px 0 0 0",
        letterSpacing: "0.03em",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        cursor: "pointer",
        transition: "background 0.25s",
      }}
      onClick={onClick}
      data-testid="ttt-reset-btn"
    >
      Reset Game
    </button>
  );
}

export default ResetButton;
