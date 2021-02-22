import React from 'react'
import ReactDOM from 'react-dom'
import { Header } from './components/Header.js'
import { Content } from './components/Content.js'
import { Total } from './components/Total.js'

const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
        <div>
            <Header title={course} />
            <Content part1={part1} part2={part2} part3={part3} />
            <Total
                total={part1.exercises + part2.exercises + part3.exercises}
            />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
