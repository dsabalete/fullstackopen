import React from 'react'
import Person from './Person'

const People = ({ persons, filter }) => {
    return (
        <div>
            {persons
                .filter((p) => {
                    if (filter.length) {
                        return p.name.toLowerCase().includes(filter)
                    } else {
                        return true
                    }
                })
                .map((person) => (
                    <Person key={person.name} person={person} />
                ))}
        </div>
    )
}

export default People
