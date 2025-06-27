//
// API client for backend_api communication
//

/**
 * API base URL for backend communication.
 * Uses REACT_APP_API_URL from .env; fallback to localhost for dev.
 */
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:3001";

// PUBLIC_INTERFACE
/**
 * Starts a new game.
 * Returns: { board: string[], current_player: string, winner: string|null, is_draw: bool }
 */
export async function startGame() {
  const res = await fetch(`${API_BASE}/game/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) throw new Error("Failed to start game.");
  return res.json();
}

// PUBLIC_INTERFACE
/**
 * Makes a move at the given index for the current player.
 * @param {number} index - Board index [0..8]
 * Returns: { board, current_player, winner, is_draw }
 */
export async function makeMove(index) {
  const res = await fetch(`${API_BASE}/game/move`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ position: index })
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Move failed.");
  }
  return res.json();
}

// PUBLIC_INTERFACE
/**
 * Get current game state.
 * Returns: { board, current_player, winner, is_draw }
 */
export async function getGameState() {
  const res = await fetch(`${API_BASE}/game`, {
    method: "GET"
  });
  if (!res.ok) throw new Error("Failed to get game state.");
  return res.json();
}

// PUBLIC_INTERFACE
/**
 * Restart the game (reset state).
 * Returns: { board, current_player, winner, is_draw }
 */
export async function resetGame() {
  const res = await fetch(`${API_BASE}/game/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });
  if (!res.ok) throw new Error("Failed to reset game.");
  return res.json();
}
