import React, { useState, useEffect } from 'react'
import { getAll, create, remove, update } from './services/persons'
import Filter from './components/Filter'
import Form from './components/Form'
import People from './components/People'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterBy, setFilterBy] = useState('')
    const [message, setMessage] = useState(null)
    const [messageError, setMessageError] = useState(null)

    useEffect(() => {
        getAll()
            .then((persons) => {
                setPersons(persons)
            })
            .catch((error) => {
                notifyError(`Error while getting contacts from Phonebook`)
            })
    }, [])

    const notify = (msg) => {
        setMessage(msg)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const notifyError = (error) => {
        setMessageError(error)
        setTimeout(() => {
            setMessageError(null)
        }, 5000)
    }

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

                    update(personObj.id, personObj)
                        .then((response) => {
                            const updatedObj = response
                            const updatedPersons = persons
                                .filter((p) => p.id !== personObj.id)
                                .concat(updatedObj)
                            setPersons(updatedPersons)
                            notify(
                                `${updatedObj.name}'s number has been updated`
                            )
                        })
                        .catch((error) => {
                            notifyError(
                                `Information of ${personObj.name} has already removed from server`
                            )
                            setPersons(
                                persons.filter((p) => p.id !== personObj.id)
                            )
                        })
                }
            } else {
                const personObj = {
                    name: newName,
                    number: newNumber
                }
                create(personObj)
                    .then((person) => {
                        setPersons(persons.concat(person))
                        notify(`${person.name} has been added to the phonebook`)
                    })
                    .catch((error) => {
                        notifyError(
                            `Something went wrong while creating a new person`
                        )
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
            remove(person.id)
                .then((response) => {
                    if (response.status === 200) {
                        const updatePersons = persons.filter(
                            (p) => p.id !== person.id
                        )
                        setPersons(updatePersons)
                        notify(`${person.name} has been removed from phonebook`)
                    }
                })
                .catch((error) => {
                    notifyError(
                        `Something went wrong while removing person in phonebook`
                    )
                })
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>

            <Notification message={message} />
            <Error message={messageError} />

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
