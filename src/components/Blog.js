import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, editBlog, loggedUser, removeBlog }) => {

  const [isExpanded, setExpand] = useState(false)

  const showWhenLogged = { display: loggedUser ? '' : 'none' }

  const updateBlog = () => {
    const updatingBlog = {
      id: blog.id,
      user: blog.user,
      likes: ++blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    editBlog(updatingBlog)
  }

  const deleteBlog = () => {
    const confirmed = window.confirm(`Remove ${blog.title} by ${blog.author}`)

    if(confirmed){
      removeBlog(blog.id, loggedUser.token)
    }
  }

  return (
    <li style={showWhenLogged}>
      {blog.title} by {blog.author ? blog.author : 'unknown'}
      <button onClick={() => setExpand(!isExpanded)}>{isExpanded ? 'close' : 'view'}</button>
      <br/>
      {isExpanded &&
        <>
          {blog.url}
          <br/>
          {blog.likes}
          <button onClick={updateBlog}>like</button>
          <br/>
          {blog.user.name}
          {blog.user.username === loggedUser.username &&
            <button onClick={deleteBlog}>remove</button>
          }
        </>
      }
    </li>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  editBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  loggedUser: PropTypes.object
}

export default Blog
