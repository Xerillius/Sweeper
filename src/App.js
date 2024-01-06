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
  const [stats, setStats] = useState('')

  useEffect(() => {
    setGame({...game, display: functions.initGame(game)})
  }, [])

  useEffect(() => {
    if(game.display[0] === 'unset'){
      setGame({...game, dead: false, display: functions.initGame(game)})
    } else {
      const result = functions.getMoves(game)
      let remaining = result[0]
      let flaggedCount = result[1]
      if(remaining == game.totalMines){
        setGame({...game, totalMines: 0, win: true})
      }
      setStats({remaining: remaining, flaggedCount: flaggedCount})
    }
  }, [game])

  return (
    <GameContext.Provider value={{game, setGame}}>
      <div className="App">
      </div>
    </GameContext.Provider>
  );
}

export default App;
