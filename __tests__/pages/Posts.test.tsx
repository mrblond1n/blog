import {render, screen} from '@testing-library/react'
import Posts from 'pages'
import React from 'react'

describe('<Posts />', () => {
  test('should display posts page', async () => {
    render(<Posts />)
    const divElement = screen.getByRole('heading')

    expect(divElement.innerHTML).toBe('POSTS')
  })
})
