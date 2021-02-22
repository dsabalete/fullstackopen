import React from 'react'
import ReactDOM from 'react-dom'
import { Header } from './components/Header.js'
import { Content } from './components/Content.js'
import { Total } from './components/Total.js'

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    const parts = [
        { name: part1, exercises: exercises1 },
        { name: part2, exercises: exercises2 },
        { name: part3, exercises: exercises3 }
    ]

    return (
        <div>
            <Header title={course} />
            <Content parts={parts} />
            <Total parts={parts.map((p) => p.exercises)} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
