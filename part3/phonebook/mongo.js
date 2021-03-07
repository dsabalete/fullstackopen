const mongoose = require('mongoose')
require('dotenv').config()
const Person = require('./models/person')

const person = new Person({
    name: 'Magneto',
    number: '32234-234234'
})

// person.save().then((result) => {
//     console.log('person saved!')
//     mongoose.connection.close()
// })

Person.find({ name: 'Magneto' }).then((result) => {
    result.forEach((person) => {
        console.log(person.toJSON())
    })
    mongoose.connection.close()
})

// Person.find({}).then((result) => {
//     result.forEach((person) => {
//         console.log(person.toJSON())
//     })
//     mongoose.connection.close()
// })
