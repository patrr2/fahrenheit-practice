import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { easyFToCProblemSet } from './questions'
import Game from './Game'

const problemSet = easyFToCProblemSet()


function App() {
  return (
    <>
      <Game />
    </>
  )
}

export default App
