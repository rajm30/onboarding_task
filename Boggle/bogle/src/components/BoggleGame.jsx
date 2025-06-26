import React, { useState } from "react";
import "./BoggleGame.css";

const BoggleGame = () => {
  const [grid, setGrid] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [wordInput, setWordInput] = useState("");
  const [foundWordss, setFoundWords] = useState([]);
  const [randoms, setRendoms] = useState([]);

  const aroundWords = [
    "play",
    "hope",
    "free",
    "life",
    "grow",
    "calm",
    "safe",
    "park",
    "wind",
    "flow",
    "jump",
    "walk",
    "swim",
    "spin",
    "roll",
    "drip",
    "loop",
    "turn",
    "drift",
    "veer",
    "ride",
    "dash",
    "hike",
    "trot",
    "glide",
    "soar",
    "walt",
    "skip",
    "task",
    "drum",
    "tide",
    "wave",
    "curl",
    "arch",
    "veer",
    "sway",
    "zoom",
    "move",
    "spin",
    "veer",
    "nest",
    "rest",
    "peek",
    "seek",
    "tuck",
    "park",
    "zoom",
    "seam",
    "sear",
    "stir",
  ];

  const randomWords = [];

  const generateGrid = () => {
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * aroundWords.length);
      randomWords.push(aroundWords[randomIndex]);
    }

    setRendoms(randomWords);
    let string = randomWords.toString();
    const letters = string.replaceAll(",", "").split("");

    const newGrid = [];

    for (let i = 0; i < 4; i++) {
      const row = [];
      for (let j = 0; j < 4; j++) {
        row.push(letters[Math.floor(Math.random() * letters.length)]);
      }
      newGrid.push(row);
    }

    setGrid(newGrid);
  };

  const startGame = () => {
    generateGrid();
    setGameStarted(true);
    setFoundWords([]);
    setWordInput("");
  };

  const stopGame = () => {
    setGameStarted(false);
    setGrid([]);
    setFoundWords([]);
    setWordInput("");
  };

  function handleSubmitBTN() {
    for (let i = 0; i < 4; i++) {
      let word = [];
      if (randoms[i] == wordInput) {
        console.log("randoms[i] true include", randoms[i]);
        setFoundWords((prev) => [...prev, randoms[i]]);
      }
    }

    if (foundWordss.includes(wordInput)) {
      alert("Alredy Word are there");
    }
    if (!foundWordss.includes(wordInput)) {
      alert("Not Valid Word");
    }
  }

  return (
    <div className="boggle-game">
      <h1>Boggle Game</h1>

      <div className="game-controls">
        <button
          className="start-btn"
          onClick={startGame}
          disabled={gameStarted}
        >
          Start Game
        </button>
        <button className="end-btn" onClick={stopGame} disabled={!gameStarted}>
          Stop Game
        </button>
      </div>

      {gameStarted && grid.length > 0 && (
        <div style={{ margin: "20px 0", textAlign: "center" }}>
          <h3>4*4</h3>
          <div className="boggle-grid">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="grid-row">
                {row.map((letter, colIndex) => (
                  <div key={`${rowIndex}-${colIndex}`} className="grid-cell">
                    {letter}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {gameStarted && (
        <div className="word-input-container" style={{ margin: "20px 0" }}>
          <h3>Find Words</h3>
          <div>
            <input
              type="text"
              className="word-input"
              value={wordInput}
              onChange={(e) => setWordInput(e.target.value)}
              placeholder="Enter a word..."
              autoFocus
            />
            <button className="submit-btn" onClick={handleSubmitBTN}>
              Submit
            </button>
          </div>
        </div>
      )}

      {gameStarted && (
        <div style={{ margin: "20px 0" }}>
          <h3>Found Words ({foundWordss.length})</h3>
          <div className="words-list">
            {foundWordss.length === 0 ? (
              <p style={{ textAlign: "center", color: "#666" }}>
                No words found yet. Start finding words!
              </p>
            ) : (
              foundWordss.map((word, index) => (
                <div key={index} className="word-item">
                  <span>{word}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BoggleGame;
