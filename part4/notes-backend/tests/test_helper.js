const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true
  }
]

const initialUsers = [
  {
    username: 'root',
    name: 'Root user',
    passwordHash: '$2b$10$HtHDtjx7Dllw8fJXr4fwlOC4zZxJc.6QUHFXDZJUya2Ft6JEu9yl.'
  },
  {
    username: 'pepito',
    name: 'Pepe Jander',
    passwordHash: '$2b$10$Qki2iiIRimLgxXOhVbb0Lu8Pe9y8UGO4mAYZIHj0MfYnnb69HXZAa'
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon', date: new Date() })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map((note) => note.toJSON())
}

module.exports = {
  initialNotes,
  initialUsers,
  nonExistingId,
  notesInDb
}
