import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'

describe('BlogForm', () => {
  let component
  const addBlogMock = jest.fn()

  beforeEach(() => {
    component = render(<BlogForm addBlog={addBlogMock} />)
  })
  test('it calls "addBlog" handler with the right details when a new blog is created.', () => {
    const form = component.container.querySelector('form')
    const inputTitle = component.container.querySelector('input[name=Title]')
    const inputAuthor = component.container.querySelector('input[name=Author]')
    const inputUrl = component.container.querySelector('input[name=URL]')

    fireEvent.change(inputTitle, { target: { value: 'Blog de Pepe' } })
    fireEvent.change(inputAuthor, { target: { value: 'Pepe' } })
    fireEvent.change(inputUrl, { target: { value: 'https//blog.pepe.es' } })
    fireEvent.submit(form)

    expect(addBlogMock.mock.calls).toHaveLength(1)
  })
})
