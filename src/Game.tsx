import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { easyFToCProblemSet } from './questions'
import Timer from './Timer'
import OverlappingAudio from './OverlappingAudio'

const problemSet = easyFToCProblemSet()

const successAudio = OverlappingAudio('./public/success_bell-6776.mp3')

function App() {
  const [count, setCount] = useState(0)
  const [input, setInput] = useState("")
  const [rightAnswer, setRightAnswer] = useState(false)
  const [timeoutForNextQuestion, setTimeoutForNextQuestion] = useState<number | null>(null)
  const [timerExpiration, setTimerExpiration] = useState<[number | null, number | null]>([null, null])
  const [streak, setStreak] = useState(0)

  const currentQuestion = problemSet[count % problemSet.length]

  const nextRound = () => {
    if (timeoutForNextQuestion !== null) {
      clearTimeout(timeoutForNextQuestion)
    }
    setTimeoutForNextQuestion(null) // timeout can be null in this update but non-null in the latest update
    setRightAnswer(false)
    setCount(count + 1)
    setTimerExpiration([Date.now(), Date.now() + 10000])
  }

  const isBetweenRounds = timeoutForNextQuestion !== null

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (isBetweenRounds) {
        return nextRound()
      }

      if (currentQuestion.verify(input)) {
        successAudio.play()
        setRightAnswer(true)
        setStreak(streak + 1)
      } else {
        setStreak(0)
      }

      setInput("")
      setTimeoutForNextQuestion(setTimeout(() => {
        return nextRound()
      }, 1500))
    }
  }

  return (
    <>
      <h3>Streak: {streak}</h3>
      <h1 className={"text-5xl font-bold " + (rightAnswer ? 'text-green-600' : '')}>
          { timeoutForNextQuestion !== null ? currentQuestion.humanReadableSolution : currentQuestion.question}
      </h1>

      <Timer start={timerExpiration[0]} expiration={timerExpiration[1]} onExpire={() => {
        if (!isBetweenRounds) setStreak(0)
      }} />
      <input value={input} type="text" autoFocus={true} className="h-10" onKeyDown={handleEnter} onChange={(e) => setInput(e.currentTarget.value)}></input>
    </>
  )
}

export default App
