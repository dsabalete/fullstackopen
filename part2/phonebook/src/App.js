import React, { useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import People from './components/People'

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
        setFilterBy(newFilter.toLowerCase())
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handle={handleFilter} filter={filterBy} />
            <h3>add a new</h3>
            <Form
                handleSubmit={handleSubmit}
                handleChangeName={handleChangeName}
                handleChangeNumber={handleChangeNumber}
                newName={newName}
                newNumber={newNumber}
            />
            <h2>Numbers</h2>
            <People persons={persons} filter={filterBy} />
        </div>
    )
}

export default App
