const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
require('dotenv').config()

const password = process.env.MONGO_PASSWORD
const url = `mongodb+srv://fullstack:${password}@cluster0.9aajn.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Note = mongoose.model('Note', noteSchema)

// let notes = [
//     {
//         id: 1,
//         content: 'HTML is easy',
//         date: '2019-05-30T17:30:31.098Z',
//         important: true
//     },
//     {
//         id: 2,
//         content: 'Browser can execute only Javascript',
//         date: '2019-05-30T18:39:34.091Z',
//         important: false
//     },
//     {
//         id: 3,
//         content: 'GET and POST are the most important methods of HTTP protocol',
//         date: '2019-05-30T19:20:14.298Z',
//         important: true
//     }
// ]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then((notes) => {
        response.json(notes)
    })
})

const generateId = () => {
    const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (!body.content) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()
    }

    notes = notes.concat(note)

    response.json(note)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find((note) => note.id === id)

    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter((note) => note.id !== id)

    response.status(204).end()
})

app.put('/api/notes/:id', (request, response) => {
    const body = request.body
    const id = Number(request.params.id)
    const updatedNote = {
        content: body.content,
        important: body.important,
        date: new Date().toISOString(),
        id
    }
    notes = notes.map((note) => (note.id !== id ? note : updatedNote))
    response.status(204).end()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
const HOST = process.env.HOST || 'http://localhost'
app.listen(PORT, () => {
    console.log(`Server running on ${HOST}:${PORT}`)
})
