import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const PopularAnecdote = ({ anecdotes, votes, mostVotes }) => {
  // If nobody has voted yet, display nothing
  if (Math.max(...votes) === 0) {
    return null
  }

  const index = mostVotes()

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[index]}
      <p>has {votes[index]} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  const handleClick = () =>
    {
       setSelected(getRandomInt(anecdotes.length));
    } 

  const handleVote = () =>
  {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  }
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const mostVotes = () => {
    let maxVotes = 0
    let maxIndex = 0
    votes.forEach((vote, index) => {
      if (vote > maxVotes) {
        maxVotes = vote
        maxIndex = index
      }
    })
    return maxIndex
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br></br>
      <p>has {votes[selected]} votes</p>
      <Button onClick={handleClick} text='next anecdote'></Button>
      <Button onClick={handleVote} text='vote'></Button>
      <PopularAnecdote anecdotes={anecdotes} votes={votes} mostVotes={mostVotes}></PopularAnecdote>
    </div>
  )
}

export default App