import {render, screen} from '@testing-library/react';
import {LinkContainer} from 'features/signin/containers/LinkContainer';
import React from 'react';

describe('<LinkContainer />', () => {
    test('should render LinkContainer', () => {
        render(<LinkContainer />);
        const element = screen.getByRole('link');

        expect(element).toBeInTheDocument();
    });
});
