const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  return blogs.map((blog) => blog.likes).reduce((acc, curr) => acc + curr, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, curr) => (prev.likes > curr.likes ? prev : curr))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
