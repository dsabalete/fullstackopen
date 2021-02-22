import React from 'react'
import { Part } from './Part.js'

export const Content = (props) => (
    <div>
        {props.parts.map((part, index) => (
            <Part part={part} key={index} />
        ))}
    </div>
)
