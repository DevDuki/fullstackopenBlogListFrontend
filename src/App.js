import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userStringified = window.localStorage.getItem('loggedUser')
    if(userStringified){
      const user = JSON.parse(userStringified)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userObject) => {

    try {
      const user = await loginService.login(userObject)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
    setNotification('Successfully logged out')
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addBlog = async (blogObject) => {
    try {
      const createdBlog = await blogService
        .create(blogObject)

      setBlogs(blogs.concat(createdBlog))
      blogFormRef.current.toggleVisibility()

      setNotification(`New Blog '${createdBlog.title}' by '${createdBlog.author ? createdBlog.author : 'unknown'}' added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Failed creating Blog: Title and Url are required fields')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } 
  }

  const updateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject)

      setBlogs(blogs.map((blog) => blog.id === blogObject.id ? updatedBlog : blog))
      setNotification(`Updated Blog '${updatedBlog.title}'`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Failed updating Blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (id, token) => {
    try {
      await blogService.remove(id, token)

      const deletedBlog = blogs.filter((blog) => blog.id === id)[0]
      setBlogs(blogs.filter((blog) => blog.id !== id))
      setNotification(`Deleted Blog '${deletedBlog.title}'`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification('Failed deleting Blog')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <LoginForm handleLogin={handleLogin}/>
  )

  const blogForm = () => (
    <Togglable buttonLabel='New Blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <h2>{user === null ? 'Log in to application' : 'Blogs'}</h2>
      <Notification errorMessage={errorMessage} notification={notification} />
      {user === null
        ? loginForm()
        : <div>
            <p>{user.username} logged in</p>      
            <button onClick={handleLogout}>logout</button>
            {blogForm()}
          </div>
      }
      <ul className='blog-list'>
        {blogs.sort((a, b) => b.likes - a.likes).map((blog) => 
          <Blog 
            key={blog.id} blog={blog} loggedUser={user}
            editBlog={updateBlog} removeBlog={deleteBlog}
          />
        )}
      </ul>
    </div>
  )
}

export default App