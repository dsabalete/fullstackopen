const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Nuxt Blog',
    author: 'Sebastien Chopin',
    url: 'https://nuxtjs.org/blog/',
    likes: 5
  },
  {
    title: 'Evan You Blog',
    author: 'Evan You',
    url: 'https://blog.evanyou.me/',
    likes: 3
  }
]

const initialUsers = [
  {
    username: 'root',
    name: 'da Root',
    password: '12345678'
  },
  {
    username: 'admin',
    name: 'Administrator',
    password: 'supersecret'
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'willremovethissoon',
    author: 'Anonymous',
    url: 'https://rabblewriter.blogspot.com/',
    likes: 0
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  initialUsers,
  nonExistingId,
  blogsInDb,
  usersInDb
}
