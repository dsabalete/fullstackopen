import React from 'react'

const Person = ({ person, handleRemove }) => {
    return (
        <div key={person.name}>
            {person.name} {person.number}{' '}
            <button onClick={handleRemove}>delete</button>
        </div>
    )
}

export default Person
