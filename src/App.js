import React, { useState, useEffect } from 'react';
import './App.css';

import {GameContext} from './GameContext'

const functions = require('./GameFunctions.js')

function App() {
  const initState = {
    xDim: 10,
    yDim: 10,
    totalMines: 10,
    display: ["unset"],
    dead: false,
    win: false,
    flagging: false
  }

  const [game, setGame] = useState(initState)

  useEffect(() => {
    setGame({...game, display: functions.initGame()})
  }, [])

  return (
    <GameContext.Provider value={{game, setGame}}>
      <div className="App">
      </div>
    </GameContext.Provider>
  );
}

export default App;
