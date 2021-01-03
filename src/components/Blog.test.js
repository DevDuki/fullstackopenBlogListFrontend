import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'



describe('<Blog />', () => {
  let component
  let likeBlog
  let removeBlog

  beforeEach(() => {
    const blog = {
      title: 'blog title',
      author: 'blog author',
      likes: 10,
      url: 'blog url',
      user: {
        username: 'blog username',
        name: 'blog user'
      }
    }

    const loggedUser = {
      username: 'blog username',
      name: 'blog user'
    }

    likeBlog = jest.fn()
    removeBlog = jest.fn()
  
    component = render(
      <Blog 
        blog={blog} editBlog={likeBlog} 
        removeBlog={removeBlog} loggedUser={loggedUser}
      />
    )
  })

  test('by default renders title and author only', () => {
    expect(component.container).toHaveTextContent('blog title')
    expect(component.container).toHaveTextContent('blog author')
    expect(component.container).not.toHaveTextContent('10')
    expect(component.container).not.toHaveTextContent('blog url')
  })

  test('toggles the detailed view when pressing the view and close button', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    expect(component.container).toHaveTextContent('10')
    expect(component.container).toHaveTextContent('blog url')
    expect(component.container).toHaveTextContent('blog user')
    expect(component.container).toHaveTextContent('remove')

    const closeButton = component.getByText('close')
    fireEvent.click(closeButton)

    expect(component.container).not.toHaveTextContent('blog url')
  })

  test('executes the like event handler twice and increases the like number by two when the like button is clicked twice', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeBlog.mock.calls).toHaveLength(2)
    expect(likeBlog.mock.calls[0][0].likes).toBe(11)
    expect(likeBlog.mock.calls[1][0].likes).toBe(12)
  })
})
