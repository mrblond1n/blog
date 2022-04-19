import {render, screen} from '@testing-library/react';
import {AuthFormContainer} from 'features/auth/containers/AuthFormContainer';
import {setState} from 'features/auth/model/events';
import React from 'react';

describe('<AuthFormContainer />', () => {
    test('should render AuthFormContainer', () => {
        render(<AuthFormContainer />);
        const element = screen.getByRole('form');

        expect(element).toBeInTheDocument();
    });

    test('should render AuthInputsContainer with sign_in inputs', () => {
        render(<AuthFormContainer />);
        const elements = screen.getAllByTestId(/input_/);

        expect(elements.length).toBe(2);
    });

    test('should render AuthInputsContainer with sign_up inputs', () => {
        setState('SIGN_UP');
        render(<AuthFormContainer />);
        const elements = screen.getAllByTestId(/input_/);

        expect(elements.length).toBe(5);
    });
});
