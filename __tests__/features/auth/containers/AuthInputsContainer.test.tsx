import {render, screen} from '@testing-library/react';
import {AuthInputsContainer} from 'features/auth/containers/AuthInputsContainer';
import {setState} from 'features/auth/model/events';
import React from 'react';

describe('<AuthInputsContainer />', () => {
    test('should render AuthInputsContainer with sign_in inputs', () => {
        render(<AuthInputsContainer />);
        const elements = screen.getAllByTestId(/input_/);

        expect(elements.length).toBe(2);
    });

    test('should render AuthInputsContainer with sign_up inputs', () => {
        setState('SIGN_UP');
        render(<AuthInputsContainer />);
        const elements = screen.getAllByTestId(/input_/);

        expect(elements.length).toBe(5);
    });
});
