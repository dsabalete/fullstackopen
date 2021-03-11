const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  return blogs.map((blog) => blog.likes).reduce((acc, curr) => acc + curr, 0)
}

module.exports = {
  dummy,
  totalLikes
}
