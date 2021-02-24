import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1234567' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (newName.length) {
            if (persons.map((person) => person.name).includes(newName)) {
                alert(`${newName} is already added to the phonebook`)
            } else {
                const personObj = {
                    name: newName,
                    number: newNumber
                }
                setPersons(persons.concat(personObj))
            }
            setNewName('')
            setNewNumber('')
        }
    }

    const handleChangeName = (e) => {
        if (e.target.value) setNewName(e.target.value)
    }

    const handleChangeNumber = (e) => {
        if (e.target.value) setNewNumber(e.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input onChange={handleChangeName} value={newName} />
                </div>
                <div>
                    number:{' '}
                    <input onChange={handleChangeNumber} value={newNumber} />
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => (
                <div key={person.name}>
                    {person.name} {person.number}
                </div>
            ))}
        </div>
    )
}

export default App
