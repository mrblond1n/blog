import {render, screen} from '@testing-library/react';
import {FormContainer} from 'features/form/containers/FormContainer';
import React from 'react';

describe('<FormContainer />', () => {
    test('should render AuthFormContainer', () => {
        render(<FormContainer />);
        const element = screen.getByRole('form');

        expect(element).toBeInTheDocument();
    });
});
