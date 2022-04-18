import {render, screen} from '@testing-library/react';
import {AuthFormContainer} from 'features/auth/containers/AuthFormContainer';
import React from 'react';

describe('<AuthFormContainer />', () => {
    test('should render AuthFormContainer', () => {
        render(<AuthFormContainer />);
        const element = screen.getByRole('form');

        expect(element).toBeInTheDocument();
    });
});
