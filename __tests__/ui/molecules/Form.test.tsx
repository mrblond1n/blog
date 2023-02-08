import {render, screen} from '@testing-library/react'
import React from 'react'
import {Form} from 'ui/atoms/Form'

describe('<Form />', () => {
  test('should display a Form component', () => {
    render(<Form />)
    const element = screen.getByRole('form')

    expect(element).toBeInTheDocument()
  })
})
