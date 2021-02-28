import React, { useState, useEffect } from 'react'
import { getAll, create, remove } from './services/persons'
import Filter from './components/Filter'
import Form from './components/Form'
import People from './components/People'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterBy, setFilterBy] = useState('')

    useEffect(() => {
        getAll().then((persons) => {
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
                create(personObj).then((person) => {
                    setPersons(persons.concat(person))
                })
            }
            setNewName('')
            setNewNumber('')
        }
    }

    const handleChangeName = (e) => {
        setNewName(e.target.value)
    }

    const handleChangeNumber = (e) => {
        setNewNumber(e.target.value)
    }

    const handleFilter = (e) => {
        const newFilter = e.target.value
        setFilterBy(newFilter.toLowerCase())
    }

    const handleDeletePerson = (person) => {
        const resp = window.confirm(`Delete ${person.name}?`)
        if (resp) {
            remove(person.id).then((response) => {
                if (response.status === 200) {
                    const updatePersons = persons.filter(
                        (p) => p.id !== person.id
                    )
                    setPersons(updatePersons)
                }
            })
        }
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
            <People
                persons={persons}
                filter={filterBy}
                deletePerson={handleDeletePerson}
            />
        </div>
    )
}

export default App
