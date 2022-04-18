import {fireEvent, render, screen} from '@testing-library/react';
import React from 'react';
import {Input} from 'ui/atoms/Input';

const inputValue = 'hello world';

describe('<Input />', () => {
    test('should display a Input component', () => {
        render(<Input type="text" />);
        const element = screen.getByRole('textbox');

        expect(element).toBeInTheDocument();
    });

    test('should change value if change input', () => {
        render(<Input type="text" />);
        const element = screen.getByRole('textbox');

        fireEvent.change(element, {target: {value: inputValue}});

        expect(element).toHaveValue(inputValue);
    });
});
