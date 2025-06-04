import { useState } from "react";
import "./App.css";

function App() {
  const [turn, setTurn] = useState("O");
  const [board, setBoard] = useState(Array(9).fill(""));
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] !== "" || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
      setGameOver(true);
    } else if (newBoard.every((num) => num !== "")) {
      setGameOver(true);
    } else {
      setTurn(turn === "O" ? "X" : "O");
    }
  };

  function handlePlayAgain() {
    setBoard(Array(9).fill(""));
    setTurn("O");
    setGameOver(false);
    setWinner(null);
  }

  function checkWinner(board) {
    const winnerLogic = [
      [0, 1, 2],
      [0, 4, 8],
      [0, 3, 6],
      [3, 4, 5],
      [6, 7, 8],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
    ];
    for (let logic of winnerLogic) {
      const [a, b, c] = logic;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }

  return (
    <div className="flex justify-center">
      <div className="h-[400px] w-[700px] shadow flex flex-col items-center mt-10">
        <div className="text-3xl font-semibold mt-3">Tic Tac Toe</div>
        {!gameOver && (
          <div className="text-xl font-semibold mt-3">{turn}'s Turn</div>
        )}

        <div className="grid grid-cols-3 gap-x-4 gap-y-[1px] justify-center items-center mt-4">
          {board.map((value, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className="border border-black h-16 w-32 flex justify-center items-center text-2xl cursor-pointer"
            >
              {value}
            </div>
          ))}
        </div>

        <div
          onClick={handlePlayAgain}
          className="rounded-md w-24 flex justify-center mt-4 font-semibold p-3 bg-[#663ab9] text-white cursor-pointer"
        >
          Refresh
        </div>

        <div className="mt-2 text-3xl font-semibold text-[#478cec]">
          {gameOver && (winner ? `${winner} is the winner!` : "Match is a tie")}
        </div>
      </div>
    </div>
  );
}

export default App;
