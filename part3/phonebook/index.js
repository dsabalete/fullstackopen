const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const Person = require('./models/person')

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

app.get('/api/persons', (request, response) => {
    Person.find({}).then((persons) => {
        response.json(persons.map((person) => person.toJSON()))
    })
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

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then((result) => response.status(204).end())
        .catch((error) => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
