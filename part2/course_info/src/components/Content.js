import React from 'react'
import Part from './Part'

const Content = ({ parts }) => (
    <ul>
        {parts.map((p) => (
            <Part part={p} key={p.id} />
        ))}
    </ul>
)

export default Content
