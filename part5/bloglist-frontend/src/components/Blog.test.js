import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('Blog', () => {
  let component
  const blog = {
    title: 'A wonderful blog title',
    author: 'Best seller author',
    url: 'https://best.blog.ever',
    likes: 1000,
    user: {
      name: 'Pepe',
      id: '12345'
    }
  }
  const likeBlog = jest.fn()
  const removeBlog = jest.fn()
  const user = '12345'

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        likeBlog={likeBlog}
        removeBlog={removeBlog}
        user={user}
      />
    )
  })

  test("it renders blog' title and author but does not render url or likes by default", () => {
    const div = component.container.querySelector('.blogDiv')
    expect(div).toBeDefined()
    expect(div).toHaveTextContent(blog.title)
    expect(div).toHaveTextContent(blog.author)
    expect(div).not.toHaveTextContent(blog.url)
    expect(div).not.toHaveTextContent(blog.likes)
  })

  test("the blog's url and number of likes are shown when the button controlling the shown details has been clicked.", () => {
    const div = component.container.querySelector('.blogDiv')
    const button = component.getByText('view')
    fireEvent.click(button)
    // console.log(prettyDOM(div))

    expect(div).toHaveTextContent(blog.url)
    expect(div).toHaveTextContent(blog.likes)
  })
})
