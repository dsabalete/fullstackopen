const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb
}
