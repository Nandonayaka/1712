"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TicTacToe() {
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const navigate = useNavigate();

  const clickSound = new Audio("audio/pop.mp3");
  const winSound = new Audio("audio/win.mp3");
  const loseSound = new Audio("audio/lose.mp3");

  const checkWinner = (board) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let [a,b,c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return board.includes(null) ? null : 'Draw';
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const result = checkWinner(newBoard);
    if (result) return setWinner(result);

    setTimeout(() => {
      const emptyIndices = newBoard.map((v,i) => v===null ? i : null).filter(v=>v!==null);
      if (emptyIndices.length === 0) return;

      const botIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      newBoard[botIndex] = 'O';
      setBoard(newBoard);

      const resultBot = checkWinner(newBoard);
      if (resultBot) setWinner(resultBot);

      setIsPlayerTurn(true);
    }, 300);
  };

  const resetGame = () => {
    setBoard(emptyBoard);
    setWinner(null);
    setIsPlayerTurn(true);
  };

  useEffect(() => {
    if (!winner) return;
    if (winner === 'X') winSound.play().catch(() => {});
    if (winner === 'O') loseSound.play().catch(() => {});
  }, [winner]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-gradient-to-br from-pink-200 to-yellow-100">
      
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-gray-800 animate-pulse drop-shadow-md text-center">
        Tic Tac Wle
      </h1>

      {/* Responsive Game Board */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-xs sm:max-w-sm p-2 bg-white/40 backdrop-blur-xl rounded-3xl shadow-xl">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className="
              w-full aspect-square rounded-2xl bg-white/70 shadow-md
              flex items-center justify-center text-3xl sm:text-4xl font-extrabold
              hover:bg-white hover:scale-105 hover:shadow-xl
              transition-all duration-200 active:scale-95
            "
          >
            <span className={`${cell === "X" ? "text-blue-600" : "text-red-500"}`}>
              {cell}
            </span>
          </button>
        ))}
      </div>

      {/* Winner Message */}
      {winner && (
        <div className="mt-6 w-full max-w-xs sm:max-w-sm bg-white/60 backdrop-blur-lg p-5 rounded-2xl shadow-lg animate-[fadeIn_0.4s] text-center space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            {winner === "Draw"
              ? "Seri dong…"
              : winner === "X"
              ? "Menang Hoki yh."
              : "Kalah. Cupu km."}
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-2 mt-2">
            <button
              onClick={resetGame}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition shadow"
            >
              Main Lagi
            </button>

            {winner === "X" && (
              <button
                onClick={() => navigate("/menu")}
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition shadow"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500 text-center">
        Tip: Klik kotak untuk menandai X, komputer akan menandai O.
      </p>
    </div>
  );
}
