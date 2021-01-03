import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('creates a blog with the right details when submitting', () => {
    const createBlog = jest.fn()
    
    const component = render(
      <BlogForm createBlog={createBlog} /> 
    )

    const titleInput  = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput    = component.container.querySelector('#url')

    fireEvent.change(titleInput, {
      target: { value: 'testTitle' }
    })
    fireEvent.change(authorInput, {
      target: { value: 'testAuthor' }
    })
    fireEvent.change(urlInput, {
      target: { value: 'testurl' }
    })

    const form = component.container.querySelector('form')
    fireEvent.submit(form)
    console.log('mock', createBlog.mock.calls)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testTitle')
    expect(createBlog.mock.calls[0][0].author).toBe('testAuthor')
    expect(createBlog.mock.calls[0][0].url).toBe('testurl')
  })  
})
