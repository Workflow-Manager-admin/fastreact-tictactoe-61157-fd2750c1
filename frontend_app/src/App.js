import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from "./components/GameBoard";

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <header className="App-header" style={{minHeight: "100vh", justifyContent: "flex-start", padding: "32px 0 0 0"}}>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <h1 style={{fontSize: "2.2rem", margin: "24px 0 0 0", fontWeight: 800, letterSpacing: "0.03em"}}>Tic Tac Toe</h1>
        <GameBoard />
        <div style={{marginTop: "16px", fontSize: "0.8rem", color: "var(--text-secondary)"}}>
          <span>Modern minimal React UI • Kavia+Starter</span>
        </div>
      </header>
    </div>
  );
}

export default App;
