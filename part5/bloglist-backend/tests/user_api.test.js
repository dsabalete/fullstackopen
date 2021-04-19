const mongoose = require('mongoose')
const supertest = require('supertest')
const { usersInDb, initialUsers } = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially one user in DB', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'da Root', passwordHash })

    await user.save()
  })

  test('login success', async () => {
    const userPass = {
      username: 'root',
      password: 'sekret'
    }

    await api
      .post('/api/login')
      .send(userPass)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

describe('when there are some users in DB', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(initialUsers.length)
  })
})

describe('creating users', () => {
  test('creation request with missing usename gives an error', async () => {
    const newUser = {
      name: 'Superuser',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('creation request with short usename gives an error', async () => {
    const newUser = {
      username: 'fu',
      name: 'Superuser',
      password: 'salainen'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(JSON.parse(response.error.text).error).toBe(
      'User validation failed: username: Path `username` (`fu`) is shorter than the minimum allowed length (3).'
    )
  })

  test('creation request with missing password gives an error', async () => {
    const newUser = {
      username: 'root',
      name: 'Kevin Mitnick'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(JSON.parse(response.error.text)).toEqual({
      error: 'password missing or invalid'
    })
  })

  test('creation request with not unique username gives an error', async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)

    const newUser = {
      username: 'root',
      name: 'Another Mitnick',
      password: 'whatever'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(JSON.parse(response.error.text)).toEqual({
      error:
        'User validation failed: username: Error, expected `username` to be unique. Value: `root`'
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})
