import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ course }) => {
    const total = course.parts
        .map((part) => part.exercises)
        .reduce((acc, curr) => acc + curr)

    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total total={total} />
        </div>
    )
}

export default Course
