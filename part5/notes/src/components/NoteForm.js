import React from 'react'

const NoteForm = ({ onSubmit, note, onChange }) => {
    return (
        <form onSubmit={onSubmit}>
            <input value={note} onChange={onChange} />
            <button type='submit'>save</button>
        </form>
    )
}

export default NoteForm
