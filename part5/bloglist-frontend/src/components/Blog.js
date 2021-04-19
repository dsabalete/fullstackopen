import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, removeBlog, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const showDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const label = detailsVisible ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleClickLike = () => {
    likeBlog(blog)
  }

  const handleClickRemove = () => {
    removeBlog(blog)
  }

  return (
    <div style={blogStyle} className="blogDiv">
      <div>
        {blog.title} {blog.author}
        <button onClick={showDetails}>{label}</button>
      </div>

      {detailsVisible && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}{' '}
            <button data-test-id="like-button" onClick={handleClickLike}>
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.id === user && (
            <button onClick={handleClickRemove}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
}

export default Blog
