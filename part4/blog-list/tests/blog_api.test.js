const mongoose = require('mongoose')
const supertest = require('supertest')
const { initialBlogs, blogsInDb, nonExistingId } = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('when there are initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('unique identifier property of a post is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

describe('addition of a blog', () => {
  let token = null

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()

    const loginPass = {
      username: 'root',
      password: 'sekret'
    }
    const response = await api.post('/api/login').send(loginPass)
    token = response.body.token

    await Blog.insertMany(initialBlogs)
  })

  test('an HTTP POST request to the API successfully creates a new blog post', async () => {
    const newBlog = {
      title: 'My Blog',
      author: 'David Sabalete',
      url: 'https://blog.davidsabalete.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

    const titles = blogsAtEnd.map((n) => n.title)
    expect(titles).toContain('My Blog')
  })

  test('if the "likes" property is missing from the request, it will default to the value 0', async () => {
    const newBlogWithoutLikes = {
      title: 'My Blog',
      author: 'David Sabalete',
      url: 'https://blog.davidsabalete.com'
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toBe(0)
  })

  test('an HTTP POST request with missing fields returns a 400 BAD REQUEST response', async () => {
    const blogIncomplete = {
      author: 'David Sabalete',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(blogIncomplete)
      .expect(400)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const titles = blogsAtEnd.map((r) => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('modification of a specific blog', () => {
  test('succeeds with valid data', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes++

    await api
      .put(`/api/blogs/${blogToUpdate.id}`, blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('fails with a non existing id', async () => {
    const id = nonExistingId()

    const blogToUpdate = {
      id,
      title: 'Goldfinger',
      author: 'Dr. No',
      url: 'Moonraker island',
      likes: 10
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`, blogToUpdate)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

  test('fails with invalid data', async () => {
    const blogToUpdate = {
      id: 111112222233333,
      title: 'Goldfinger',
      author: 'Dr. No',
      url: 'Moonraker island',
      likes: 10
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`, blogToUpdate)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
