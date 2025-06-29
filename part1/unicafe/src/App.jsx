import { useState } from 'react'

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good+neutral+bad
  if(all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <>
    <StatisticLine text="good" value ={good} />
    <StatisticLine text="neutral" value ={neutral} />
    <StatisticLine text="bad" value ={bad} />
    <StatisticLine text="all" value ={all} />
    <StatisticLine text="average" value ={(good-bad)/all} />
    <StatisticLine text="positive" value ={good*100/all + "%"} />
    </>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good+1)
  const handleNeutralClick = () => setNeutral(neutral+1)
  const handleBadClick = () => setBad(bad+1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={handleGoodClick}/>
      <Button text="neutral" onClick={handleNeutralClick}/>
      <Button text="bad" onClick={handleBadClick}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App