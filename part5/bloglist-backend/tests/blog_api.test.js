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

  test('a user logged in successfully creates a new blog post', async () => {
    const newBlog = {
      title: 'My Blog',
      author: 'David Sabalete',
      url: 'https://blog.davidsabalete.com',
      likes: 0
    }

    expect(token).toBeDefined()

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

  test('fails with 409 CONFLICT for request with missing fields', async () => {
    const blogIncomplete = {
      author: 'David Sabalete',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(blogIncomplete)
      .expect(409)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
  })

  test('fails with 401 Unauthorized for request without token', async () => {
    const newBlog = {
      title: 'My Blog',
      author: 'David Sabalete',
      url: 'https://blog.davidsabalete.com',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)

    const titles = blogsAtEnd.map((n) => n.title)
    expect(titles).not.toContain(newBlog.title)
  })
})

describe('deletion of a blog', () => {
  let token = ''

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

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await blogsInDb()
    // const blogToDelete = blogsAtStart[0]

    expect(token).toBeDefined()

    const newBlog = {
      title: 'My Blog',
      author: 'David Sabalete',
      url: 'https://blog.davidsabalete.com',
      likes: 0
    }

    const responseCreate = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + token)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogToDeleteId = responseCreate.body.id

    const blogsAfterCreate = await blogsInDb()
    expect(blogsAfterCreate).toHaveLength(initialBlogs.length + 1)

    const blog = await Blog.findById(blogToDeleteId)

    await api
      .delete(`/api/blogs/${blog.id}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(204)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)

    const titles = blogsAtEnd.map((r) => r.title)
    expect(titles).not.toContain(newBlog.title)
  })

  test('fails if blog was created by another user', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    expect(token).toBeDefined()

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(401)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
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
