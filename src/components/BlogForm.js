import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title, author, url
    }

    createBlog(newBlog)

    // Only reset if user has filled the required fields.
    if(title && url){
      setTitle('')
      setAuthor('')
      setUrl('')
    }
  }

  return (
    <>
      <h2>Create new Blog</h2>
      <form onSubmit={addBlog}>
        <label htmlFor="title">Title: </label>
        <input
          id="title" name="title" type="text" value={title}
          onChange={({ target }) => setTitle(target.value)}
        /><br />
        <label htmlFor="author">Author: </label>
        <input
          id="author" name="author" type="text" value={author}
          onChange={({ target }) => setAuthor(target.value)}
        /><br />
        <label htmlFor="url">url: </label>
        <input
          id="url" name="url" type="text" value={url}
          onChange={({ target }) => setUrl(target.value)}
        /><br />
        <button type="submit">create</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm