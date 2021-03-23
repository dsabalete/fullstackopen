const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.json(savedUser)

  //   const user = await User.findOne({ username })

  //   const passwordCorrect =
  //     user === null ? false : await bcrypt.compare(password, user.passwordHash)

  //   if (!(user && passwordCorrect)) {
  //     return response.status(401).json({
  //       error: 'invalid username or password'
  //     })
  //   }

  //   const userForToken = {
  //     username: user.username,
  //     id: user._id
  //   }

  //   // token expires in 60*60 seconds, that is, in one hour
  //   const token = jwt.sign(userForToken, process.env.SECRET, {
  //     expiresIn: 60 * 60
  //   })

  //   response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = usersRouter
