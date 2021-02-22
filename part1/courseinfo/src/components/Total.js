import React from 'react'

export const Total = (props) => (
    <p>Number of exercises {props.parts.reduce((acc, curr) => acc + curr)}</p>
)
