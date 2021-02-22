import React from 'react'

export const Total = (props) => (
    <p>
        Number of exercises{' '}
        {props.parts.reduce((acc, curr) => {
            return acc + curr.exercises
        }, 0)}
    </p>
)
