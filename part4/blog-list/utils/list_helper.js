const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  return blogs.map((blog) => blog.likes).reduce((acc, curr) => acc + curr, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, curr) => (prev.likes > curr.likes ? prev : curr))
}

const mostBlogs = (blogs) => {
  const authorCount = {}
  blogs.forEach((blog) => {
    authorCount[blog.author] = (authorCount[blog.author] || 0) + 1
  })

  const author = Object.keys(authorCount).reduce((acc, curr) =>
    authorCount[acc] > authorCount[curr] ? acc : curr
  )

  return { author: author, blogs: authorCount[author] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
