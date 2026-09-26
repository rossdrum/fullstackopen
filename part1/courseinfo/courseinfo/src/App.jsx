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

const Content = ({ parts }) => {
  return (
    <div>
      <Part partName={parts[0].name} noOfExercises={parts[0].exercises} />
      <Part partName={parts[1].name} noOfExercises={parts[1].exercises} />
      <Part partName={parts[2].name} noOfExercises={parts[2].exercises} />
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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name}/>
      <Content parts= {course.parts}/>
      <Total exercises1={course.parts[0].exercises} exercises2={course.parts[0].exercises} exercises3={course.parts[0].exercises} />
    </div>
  )
}

export default App