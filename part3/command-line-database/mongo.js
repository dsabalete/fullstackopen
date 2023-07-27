const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  )
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.crmstwc.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model("Person", personSchema)

// const person = new Person({
//   name: "Pepe Botella",
//   number: "1234667",
// })

// person.save().then((result) => {
//   console.log("person saved!")
//   mongoose.connection.close()
// })

const name = process.argv[3]
const number = process.argv[4]

if (name && number) {
  const person = new Person({
    name,
    number,
  })

  person.save().then((result) => {
    console.log(`
      added ${person.name} number ${person.number} to phonebook
          `)
    mongoose.connection.close()
  })
}

Person.find({}).then((result) => {
  console.log(`
    ***************
    *             *
    *  Phonebook  *
    *             *
    ***************
    `)
  result.forEach((person) => {
    console.log(`   ${person.name} ${person.number}`)
  })
  mongoose.connection.close()
})
