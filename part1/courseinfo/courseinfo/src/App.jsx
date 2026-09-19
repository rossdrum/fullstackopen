const Header = (course) => {
console.log(course)
return (
  <h1>{course.name}</h1>
)
}

const Total = (exercisedata) => {
  console.log(exercisedata)
  return (
      <p>Number of exercises {exercisedata.exercises1 + exercisedata.exercises2 + exercisedata.exercises3}</p>
  )
}

const Content = (contentProp) => {

  return (
        <div>
          <Part partName={contentProp.part1} noOfExercises={contentProp.exercises1} />
          <Part partName={contentProp.part2} noOfExercises={contentProp.exercises2} />
          <Part partName={contentProp.part3} noOfExercises={contentProp.exercises3} />
        </div>
  )
}

const Part = (parts) => {
  console.log(parts)
  return (
    <p>{parts.partName} {parts.noOfExercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header name={course}/>
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

export default App