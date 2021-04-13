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
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
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

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem(
                'loggedBlogappUser',
                JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
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
        blogService.create(blog).then((blog) => {
            setMessage(`A new blog "${blog.title}" by ${blog.author} added`)
            setTimeout(() => {
                setMessage(null)
            }, 5000)
            setBlogs(blogs.concat(blog))
        })
    }

    const handleLikeBlog = (blog) => {
        const blogChanged = { ...blog, likes: blog.likes + 1 }
        blogService
            .update(blogChanged.id, blogChanged)
            .then((blogReturned) => {
                setMessage(
                    `Blog "${blogReturned.title}" by ${blogReturned.author} updated`
                )
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
                setBlogs(
                    blogs.map((blog) =>
                        blog.id !== blogChanged.id ? blog : blogReturned
                    )
                )
            })
            .catch((error) => {
                setErrorMessage(
                    `Blog '${blog.title}' was already removed from server`
                )
                setTimeout(() => {
                    setMessage(null)
                }, 5000)
            })
    }

    if (user === null) {
        return (
            <div>
                <h2>Log into the Blog-list app</h2>
                <Notification message={errorMessage} type='error' />
                <LoginForm
                    onSubmit={handleLogin}
                    username={username}
                    password={password}
                    setUsername={setUsername}
                    setPassword={setPassword}
                />
            </div>
        )
    }

    return (
        <div>
            <h2>Blogs</h2>

            <p>
                {user.name} logged in{' '}
                <button onClick={handleLogout}>log out</button>
            </p>

            <Notification message={message} type='info' />

            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                <BlogForm addBlog={handleAddBlog} />
            </Togglable>

            <br />

            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} likeBlog={handleLikeBlog} />
            ))}
        </div>
    )
}

export default App
