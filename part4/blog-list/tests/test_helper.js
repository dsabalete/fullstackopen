const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Nuxt Blog',
    author: 'Sebastien Chopin',
    url: 'https://nuxtjs.org/blog/',
    likes: 5,
    user: '60552998d24ff045405cfc10'
  },
  {
    title: 'Evan You Blog',
    author: 'Evan You',
    url: 'https://blog.evanyou.me/',
    likes: 3,
    user: '605529ecd24ff045405cfc11'
  }
]

const initialUsers = [
  {
    username: 'root',
    name: 'da Root',
    passwordHash: '$2b$10$WZzJ/9m1wX7CIif80BIR1u91EtJ/eT4JMhKZi6wi/qkl1E2hzp5pC'
  },
  {
    username: 'pepito',
    name: 'Pepe',
    passwordHash: '$2b$10$ZpuJ24rvE/wCZwoIGbZmXuVlmT1NW6RJUNOX1upJMKfh90G/Tg7le'
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
