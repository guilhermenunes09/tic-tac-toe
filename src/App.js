import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [player, setPlayer] = useState(0);
  
  const [status, setStatus] = useState(
    {
      1_1: 0, 1_2: 0, 1_3: 0,
      2_1: 0, 2_2: 0, 2_3: 0,
      3_1: 0, 3_2: 0, 3_3: 0
    }
  )

  const player_turn = () => {
    if (!player) return 1
    return player === 1 ? 2 :  1 
  }

  const handleClick = (pos) => {
    if(status[pos]) return;
    setPlayer(player_turn())
    setStatus({...status, [pos]: player_turn()})
  }

  const cell = (i, j) => {

    const pos = `${i}_${j}`;
    const player_class = `pressed-player-` + status[pos];

    console.log('player class', player_class)
    return <div key={j} onClick={() => handleClick(pos)} className={`col ${player_class}`}>{i}x{j} Player: {status[pos]}</div>
  }

  return (
    <div className="App">
      <header className="App-header"></header>
      Player: {player}
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
    </div>
  );
}

export default App;
