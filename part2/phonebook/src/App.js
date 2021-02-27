import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Form from './components/Form'
import People from './components/People'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterBy, setFilterBy] = useState('')

    useEffect(() => {
        personService.getAll().then((persons) => {
            setPersons(persons)
        })
    }, [])

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
                personService.create(personObj).then((person) => {
                    setPersons(persons.concat(person))
                })
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
