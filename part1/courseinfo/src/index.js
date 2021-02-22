import React from 'react'
import ReactDOM from 'react-dom'
import { Header } from './components/Header.js'
import { Content } from './components/Content.js'
import { Total } from './components/Total.js'

const App = () => {
    const course = 'Half Stack application development'
    const parts = [
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

    return (
        <div>
            <Header title={course} />
            <Content parts={parts} />
            <Total
                total={parts.reduce((acc, curr) => {
                    return acc + curr.exercises
                }, 0)}
            />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
