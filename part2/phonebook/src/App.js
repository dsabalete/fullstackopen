import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterBy, setFilterBy] = useState('')
    const [filteredPersons, setFilteredPersons] = useState(persons)

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

    const handleFilter = (e) => {
        const newFilter = e.target.value
        setFilterBy(newFilter)
        if (newFilter.length) {
            setFilteredPersons(
                persons.filter((p) => p.name.toLowerCase().includes(newFilter))
            )
        } else {
            setFilteredPersons(persons)
        }
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with{' '}
                <input onChange={handleFilter} value={filterBy} />
            </div>
            <h3>add a new</h3>
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
            {filteredPersons.map((person) => (
                <div key={person.name}>
                    {person.name} {person.number}
                </div>
            ))}
        </div>
    )
}

export default App
