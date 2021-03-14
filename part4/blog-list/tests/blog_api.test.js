const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('Blog API', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('unique identifier property of a post is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
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
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

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

    await api.post('/api/blogs').send(blogIncomplete).expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
