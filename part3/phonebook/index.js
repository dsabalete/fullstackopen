const express = require('express')
const app = express()
require('dotenv').config()
const Person = require('./models/person')

const cors = require('cors')
const morgan = require('morgan')

morgan.token('body', (req, res) => {
    if (req.method === 'POST') return JSON.stringify(req.body)
})

app.use(
    morgan(function (tokens, req, res) {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'),
            '-',
            tokens['response-time'](req, res),
            'ms',
            tokens.body(req, res)
        ].join(' ')
    })
)

app.use(cors())

app.use(express.json())

app.use(express.static('build'))

let persons = [
    {
        name: 'Arto Hellas',
        number: '040-123456',
        id: 1
    },
    {
        name: 'Ada Lovelace',
        number: '39-44-5323523',
        id: 2
    },
    {
        name: 'Dan Abramov',
        number: '12-43-234345',
        id: 3
    },
    {
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
        id: 4
    }
]

app.get('/api/persons', (request, response) => {
    Person.find({}).then((persons) => {
        response.json(persons.map((person) => person.toJSON()))
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then((person) => {
            response.json(person.toJSON())
        })
        .catch((error) => response.status(404).end())
})

// app.get('/info', (request, response) => {
//     response.send(
//         `Phonebook has info for ${persons.length}<br/><br/>${new Date()}`
//     )
// })

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter((person) => person.id !== id)
    Person.deleteOne({ id: request.params.id }, function (resp) {
        console.log(resp)
    })

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number is missing'
        })
    }

    // Person.findOne({ name: body.name }, function (err, person) {
    //     if (err) console.error(err)
    //     console.log(person)
    // })

    // if (persons.some((person) => person.name === body.name)) {
    //     return response.status(400).json({
    //         error: 'name must be unique'
    //     })
    // }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then((newPerson) => {
        response.json(newPerson.toJSON())
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
