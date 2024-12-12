import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import xicon from '/src/assets/tictactoe-x.png'
import oicon from '/src/assets/tictactoe-o.png'
import './App.css'
import Box from './Box'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isP1Next, setIsP1Next] = useState(true); 
  const [showError, setShowError] = useState(false); 
  const [showWelcomePopUp, setShowWelcomePopUp] = useState(true);
  const [showWinnerPopUp, setShowWinnerPopUp] = useState(false);
  const [showTiePopUp, setShowTiePopUp] = useState(false);

  const calculateWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {

        return board[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner()) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 1200);
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = isP1Next ? xicon : oicon;
    setBoard(newBoard);
    setIsP1Next(!isP1Next);
    setShowError(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsP1Next(true);
    setShowError(false);
    setShowWinnerPopUp(false);
    setShowTiePopUp(false);
  };

  const playGame = () => {
    setShowWelcomePopUp(false);
  }

  const winner = calculateWinner();
  const isTie = !board.includes(null) && !winner;

  useEffect(() => {
    if (winner === xicon || winner === oicon) {
      setShowWinnerPopUp(true);
    }
  }, [winner]); 

  useEffect(() => {
    if(isTie){
      setShowTiePopUp(true);
    }
  }, [isTie]);

  const renderBox = (index) => {
    return (
      <Box
        key={index}
        status={board[index]}
        onClick={() => handleClick(index)} 
      />
    );
  };

  return (
    <div className="main-content">
      <div className="turn-display">
      {`${isP1Next ? 'Player 1' : 'Player 2'}'s turn`}
      </div>
      <div className="board">
        {Array(9).fill(null).map((_, index) => renderBox(index))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>

      {showWelcomePopUp && (
        <div className="popup-screen-welcome">
          <div className="popup-content-welcome">
            <h2>Welcome</h2>
            <button className="play-button" onClick={playGame}>Play</button>
          </div>
        </div>
      )}
      {showWinnerPopUp && (
        <div className="popup-screen-winner">
          <div className="popup-content-winner">
            <h2>Winner!</h2>
            <h3>{winner === xicon ? 'Player 1' : 'Player 2'}</h3>
            <button className="reset-button" onClick={resetGame}>Play Again</button>
          </div>
        </div>
      )}
      {showTiePopUp && (
        <div className="popup-screen-tie">
          <div className="popup-content-tie">
            <h2>Tie Game</h2>
            <button className="reset-button" onClick={resetGame}>Play Again</button>
          </div>
        </div>
      )}
      {showError && (
        <div className="popup-screen-error">
          <div className="popup-content-error">
            <h3>You can't move here!</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

