import React, { useState, useEffect } from 'react'
import { getAll, create, remove, update } from './services/persons'
import Filter from './components/Filter'
import Form from './components/Form'
import People from './components/People'
import Notification from './components/Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterBy, setFilterBy] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        getAll().then((persons) => {
            setPersons(persons)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (newName.length) {
            if (persons.map((person) => person.name).includes(newName)) {
                const resp = window.confirm(
                    `${newName} is already added to the phonebook, replace the old number with the new one?`
                )
                if (resp) {
                    const prevPerson = persons.filter(
                        (p) => p.name === newName
                    )[0]

                    const personObj = { ...prevPerson, number: newNumber }

                    update(personObj.id, personObj).then((response) => {
                        const updatedObj = response
                        const updatedPersons = persons
                            .filter((p) => p.id !== personObj.id)
                            .concat(updatedObj)
                        setPersons(updatedPersons)
                        setMessage(
                            `${updatedObj.name}'s number has been updated`
                        )
                        setTimeout(() => {
                            setMessage(null)
                        }, 5000)
                    })
                }
            } else {
                const personObj = {
                    name: newName,
                    number: newNumber
                }
                create(personObj).then((person) => {
                    setPersons(persons.concat(person))
                    setMessage(`${person.name} has been added to the phonebook`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
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
                    setMessage(`${person.name} has been removed from phonebook`)
                    setTimeout(() => {
                        setMessage(null)
                    }, 5000)
                }
            })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification message={message} />

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
