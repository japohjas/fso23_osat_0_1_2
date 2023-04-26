
const Course = ({ course }) => {
  console.log('Course: ', course)
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <TotalExercies course={course} />
    </div>
  )
}

const Header = ({ course }) => {
  console.log('Header: ', course.name)
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  )
}

const Content = ({ course }) => {
  console.log('Content:', course.parts[0])
  return (
    <div>
      {course.parts.map(n => <Part key={n.id} content={n} />)}
    </div>
  )
}

const Part = ({ content }) => <p>{content.name} {content.exercises}</p>

const TotalExercies = ({ course }) => {
  const sum = course.parts.reduce((total, value) => total + value.exercises, 0)
  return (
    <div>
      <h3>total of {sum} exercises</h3>
    </div>
  )
}

export default Course