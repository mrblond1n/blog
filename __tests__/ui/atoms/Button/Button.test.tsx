import {render, screen} from '@testing-library/react'
import React from 'react'
import {Button} from 'ui/atoms/Button'

describe('<Button />', () => {
  test('should display a Button component', async () => {
    render(<Button>{'test'}</Button>)
    const element = screen.getByText(/test/i)

    expect(element).toBeInTheDocument()
  })
})
