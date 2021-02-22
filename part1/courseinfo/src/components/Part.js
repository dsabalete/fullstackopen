import React from 'react'

export const Part = (props) => (
    <p key={props.key}>
        {props.part.name} {props.part.exercises}
    </p>
)
