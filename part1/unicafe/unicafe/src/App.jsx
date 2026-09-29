import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Statistics = (props) => {

  const average = props.all === 0 ? 0 : (props.good - props.bad) / props.all
  const positive = props.all === 0 ? 0 : (props.good / props.all) * 100
  console.log('all value =' + props.all)
    if (props.all > 0)
    {
      return (
        <table>
          <tbody>
          <StatisticLine text='good' value={props.good}></StatisticLine>
          <StatisticLine text='neutral' value={props.neutral}></StatisticLine>
          <StatisticLine text='bad' value={props.bad}></StatisticLine>
          <StatisticLine text='average' value={average}></StatisticLine>
          <StatisticLine text='all' value={props.all}></StatisticLine>
          <StatisticLine text='positive' value={positive}></StatisticLine>
          </tbody>
        </table>
      )
    }
    else {
      return (
        <div>
          No feedback given!
        </div>
      )
    }
}
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  // const [average, setAverage] = useState(0)
  // const [positive, setPositive] = useState(0)


  const calculateAverage = (good, neutral, bad, all) => {
    console.log(good);
    setAverage((good + neutral + bad) / all);
  }

  const handleGood = () => {
    setAll(all +1);
    setGood(good + 1);
  }

  const handleNeutral = () => {
    setAll(all +1);
    setNeutral(neutral + 1);
  }

  const handleBad = () => {
    setAll(all +1);
    setBad(bad + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text ='good'></Button>
      <Button onClick={handleNeutral} text ='neutral'></Button>
      <Button onClick={handleBad} text ='bad'></Button>

      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}></Statistics>

    </div>
  )
}

export default App
