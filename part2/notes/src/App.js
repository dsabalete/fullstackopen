import React, { useState, useEffect } from 'react'
import { getAll, create, update } from './services/notes'
import Note from './components/Note'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('a new note...')
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        getAll().then((response) => {
            setNotes(response)
        })
    }, [])

    const toggleImportanceOf = (id) => {
        const note = notes.find((n) => n.id === id)
        const changedNote = { ...note, important: !note.important }

        update(id, changedNote)
            .then(() => {
                setNotes(
                    notes.map((note) => (note.id !== id ? note : changedNote))
                )
            })
            .catch((error) => {
                console.log(error)
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter((n) => n.id !== id))
            })
    }

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5
        }

        create(noteObject).then((returnedNote) => {
            setNotes(notes.concat(returnedNote))
            setNewNote('')
        })
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    const notesToShow = showAll ? notes : notes.filter((note) => note.important)

    return (
        <div>
            <h1>Notes</h1>

            <Notification message={errorMessage} />

            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>

            <ul>
                {notesToShow.map((note, index) => {
                    return (
                        <Note
                            key={index}
                            note={note}
                            toggleImportance={() => toggleImportanceOf(note.id)}
                        />
                    )
                })}
            </ul>

            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type='submit'>save</button>
            </form>

            <Footer />
        </div>
    )
}

export default App
