import React from 'react'
import { Part } from './Part.js'

export const Content = (props) => (
    <div>
        {props.parts.map((part, index) => (
            <Part key={index} part={part} />
        ))}
    </div>
)
