const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content courses={course.parts} />
    </div>
  )
}

const Header = (props) => <h1>{props.name}</h1>

const Content = ({ courses }) => {

  const parts = courses;
  console.log(parts[0]);
  const sum = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises, 0,);
  console.log(sum);

  return (
    <div>
      {courses.map(part => 
        <Part key={part.id} part={part} />
      )}
      <Total sum={sum} />
    </div>
  )
}


const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({sum}) => <p>Number of exercises {sum}</p>
export default Course