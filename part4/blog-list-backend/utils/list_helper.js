const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favorite, item) => {
    return favorite.likes > item.likes ? favorite : item
  }
  return blogs.reduce(reducer, {})
}

const mostBlogs = (blogs) => {
  const reducer = (most, item) => {
    if (most[item.author]) {
      most[item.author] += 1
    } else {
      most[item.author] = 1
    }
    return most
  }
  const most = blogs.reduce(reducer, {})
  const author = Object.keys(most).reduce((a, b) => (most[a] > most[b] ? a : b))
  return { author: author, blogs: most[author] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
