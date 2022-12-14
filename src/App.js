import './App.css';
import { useState, useEffect } from 'react';

let initialPlayer = 0;
let initialStatus = {
  11: 0, 12: 0, 13: 0,
  21: 0, 22: 0, 23: 0,
  31: 0, 32: 0, 33: 0
};
let initialSpotsLeft = 9;

function App() {
  const [player, setPlayer] = useState(initialPlayer);
  const [status, setStatus] = useState(initialStatus);
  const [spotsLeft, setSpotsLeft] = useState(initialSpotsLeft);
  const [finished, setFinished] = useState(false);
  const [draw, setDraw] = useState(false);
  const [playerVictory, setPlayerVictory] = useState(0);

  useEffect(() => {
    checkVictory();
    checkDraw();
  },[status])

  const restart = () => {
    setPlayer(initialPlayer);
    setStatus(initialStatus);
    setFinished(false);
    setSpotsLeft(initialSpotsLeft);
    setPlayerVictory(0);
    setDraw(false);
  }

  const player_turn = () => {
    if (!player) return 1
    return player === 1 ? 2 :  1 
  }

  const isDiagonalVictory = () => {
    if(status[11] && status[11] == status[22] && status[22] == status[33]) {
      return true;
    }
    if(status[13] && status[13] == status[22] && status[22] == status[31]) {
      return true;
    }
    return false;
  }

  const isLineVictory = () => {
    for(let i=1; i<=3; i++) { 
      if(status[`${i}${1}`] && status[`${i}${1}`] == status[`${i}${2}`] && status[`${i}${2}`] == status[`${i}${3}`]) {
        return true;
      }
      if(status[`${1}${i}`] && status[`${1}${i}`] == status[`${2}${i}`] && status[`${2}${i}`] == status[`${3}${i}`]) {
        return true;
      }
    }
    return false;
  }

  const isDraw = () => {
    if(spotsLeft == 0 && finished == false) {
      setDraw(true);
      return true;
    }
    return false;
  }

  const checkVictory = () => {
    if(isDiagonalVictory() || isLineVictory()) {
      setFinished(true);
      setPlayerVictory(player);
    }
  }

  const checkDraw = () => {
    if(isDraw()) {
      setFinished(true);
    }
  }

  const handleClick = (pos) => {
    if(status[pos]) return;
    if(finished) return;
    setPlayer(player_turn())
    setStatus({...status, [pos]: player_turn()});
    setSpotsLeft(spotsLeft - 1);
  }

  const cell = (i, j) => {
    const pos = `${i}${j}`;
    const player_class = `pressed-player-` + status[pos];
    return (
      <div key={j} onClick={() => handleClick(pos)} className={`col ${player_class}`}>
        <div className={status[pos] === 1 ? `mark-cross-45` : `initial-cross`}/>
        <div className={status[pos] === 1 ? `mark-cross-85` : `initial-cross`}/>
        <div className={status[pos] === 2 ? `mark-circle` : `mark-circle-initial`}/>
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className='main-title'>Tic Tac Toe</h1>

      </header>
      <div className='content'>
        <div style={{marginBottom: '20px'}}>Turn: Player {player == 1 ? '2' : '1'}</div>
        {
          [1,2,3].map(i => (
            <div key={i} className='row'> 
              {
                [1,2,3].map(j => (
                  cell(i,j)
                ))
              }
            </div>

          ))
        }
        { finished && 
          <button className='restart-button' onClick={restart}>Play Again</button>
        }
      </div>
      <footer>
        <div className='footer-content'>
          { playerVictory !==0 && 
            <>
              <div>Player {playerVictory} won!</div>
              <div className='congrats'>Congrats!</div>
            </>
          }
          { draw && <div>Draw!</div> }
        </div>
      </footer>
    </div>
    
  );
}

export default App;
