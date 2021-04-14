import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setUser(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleAddBlog = (blog) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blog)
      .then((blog) => {
        setMessage(`A new blog "${blog.title}" by ${blog.author} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        const blogCreated = {
          ...blog,
          user: {
            id: blog.user
          }
        }
        setBlogs(blogs.concat(blogCreated))
      })
      .catch((error) => {
        const msg = error.response.data.error
        setErrorMessage(msg)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleLikeBlog = (blog) => {
    const blogChanged = { ...blog, likes: blog.likes + 1 }
    blogService
      .update(blog.id, blogChanged)
      .then((blogReturned) => {
        setMessage(
          `Blog "${blogReturned.title}" by ${blogReturned.author} updated`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        const blogLiked = {
          ...blogReturned,
          user: {
            id: blogReturned.user
          }
        }
        setBlogs(
          blogs.map((blog) => (blog.id !== blogChanged.id ? blog : blogLiked))
        )
      })
      .catch(() => {
        setErrorMessage(`Blog "${blog.title}" was already removed from server`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const handleRemoveBlog = (blog) => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
      blogService
        .remove(blog.id)
        .then(() => {
          setBlogs(blogs.filter((b) => b.id !== blog.id))
        })
        .catch(() => {
          setErrorMessage(
            `Blog '${blog.title}' was already removed from server`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log into the Blog-list app</h2>
        <Notification message={errorMessage} type="error" />
        <LoginForm handleSubmit={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>

      <p>
        {user.name} logged in <button onClick={handleLogout}>log out</button>
      </p>

      <Notification message={message} type="info" />
      <Notification message={errorMessage} type="error" />

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm addBlog={handleAddBlog} />
      </Togglable>

      <br />

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={handleLikeBlog}
            removeBlog={handleRemoveBlog}
            user={user.id}
          />
        ))}
    </div>
  )
}

export default App
