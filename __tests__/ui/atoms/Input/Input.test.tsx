import {render, screen} from '@testing-library/react'
import React from 'react'
import {TextField} from 'ui/atoms/TextField'

// const inputValue = 'hello world';

describe('<Input />', () => {
  test('should display a Input component', () => {
    render(<TextField type="text" />)
    const element = screen.getByRole('textbox')

    expect(element).toBeInTheDocument()
  })

  // test('should change value if change input', () => {
  //     render(<TextField type="text" />);
  //     const element = screen.getByRole('textbox');
  //
  //     fireEvent.change(element, {target: {value: inputValue}});
  //
  //     expect(element).toHaveValue(inputValue);
  // });
})
