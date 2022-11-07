import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  
  const [status, setStatus] = useState(
    {
      1_1: false, 1_2: false, 1_3: false,
      2_1: false, 2_2: false, 2_3: false,
      3_1: false, 3_2: false, 3_3: false
    }
  )

  const handleClick = (pos) => {
    console.log('status', status[pos])
    setStatus({...status, [pos]: !status[pos]})
  }

  const cell = (i, j) => {
    return <div onClick={() => handleClick(`${i}_${j}`)} className={`col ${status[`${i}_${j}`] ? 'pressed' : ''}`}>{i}x{j}</div>
  }

  return (
    <div className="App">
      <header className="App-header"></header>
      
      {
        [1,2,3].map(i => (
          <div className='row'> 
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
