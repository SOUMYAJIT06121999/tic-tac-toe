import React, { useMemo, useState } from 'react';
import './TicTacToe.css';
import circleIcon from '../Assets/circle.png';
import crossIcon from '../Assets/cross.png';

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const EMPTY_BOARD = Array(9).fill('');

const getWinner = (board) => {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const TicTacToe = () => {
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [isXTurn, setIsXTurn] = useState(true);
  const [score, setScore] = useState({ x: 0, o: 0, draw: 0 });

  const winner = useMemo(() => getWinner(board), [board]);
  const isDraw = useMemo(() => !winner && board.every(Boolean), [board, winner]);

  const statusText = winner
    ? `Winner: ${winner.toUpperCase()}`
    : isDraw
      ? 'It is a draw!'
      : `Turn: ${isXTurn ? 'X' : 'O'}`;

  const playMove = (index) => {
    if (board[index] || winner) {
      return;
    }

    const mark = isXTurn ? 'x' : 'o';
    const nextBoard = [...board];
    nextBoard[index] = mark;

    const nextWinner = getWinner(nextBoard);
    const nextIsDraw = !nextWinner && nextBoard.every(Boolean);

    if (nextWinner) {
      setScore((prev) => ({ ...prev, [nextWinner]: prev[nextWinner] + 1 }));
    } else if (nextIsDraw) {
      setScore((prev) => ({ ...prev, draw: prev.draw + 1 }));
    }

    setBoard(nextBoard);
    setIsXTurn((prev) => !prev);
  };

  const resetBoard = () => {
    setBoard(EMPTY_BOARD);
    setIsXTurn(true);
  };

  const resetAll = () => {
    resetBoard();
    setScore({ x: 0, o: 0, draw: 0 });
  };

  return (
    <div className="container">
      <h1 className="title">
        Tic Tac Toe <span>React</span>
      </h1>

      <p className="status" role="status" aria-live="polite">
        {statusText}
      </p>

      <div className="scoreboard" aria-label="scoreboard">
        <span>X: {score.x}</span>
        <span>O: {score.o}</span>
        <span>Draws: {score.draw}</span>
      </div>

      <div className="board" role="grid" aria-label="tic tac toe board">
        {board.map((cell, index) => (
          <button
            key={index}
            className="boxes"
            type="button"
            role="gridcell"
            aria-label={`Cell ${index + 1}${cell ? `, ${cell.toUpperCase()}` : ''}`}
            onClick={() => playMove(index)}
          >
            {cell === 'x' && <img src={crossIcon} alt="X" />}
            {cell === 'o' && <img src={circleIcon} alt="O" />}
          </button>
        ))}
      </div>

      <div className="actions">
        <button className="reset" type="button" onClick={resetBoard}>
          New Round
        </button>
        <button className="reset reset-secondary" type="button" onClick={resetAll}>
          Reset Score
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
