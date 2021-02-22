import React from 'react'
import { Part } from './Part.js'

export const Content = (props) => (
    <div>
        <Part part={props.part1} key='1' />
        <Part part={props.part2} key='2' />
        <Part part={props.part3} key='3' />
    </div>
)
