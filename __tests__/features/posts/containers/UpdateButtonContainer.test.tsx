import {render, screen} from '@testing-library/react';
import {INTL} from 'constants/intl';
import {UpdateButtonContainer} from 'features/posts/containers/UpdateButtonContainer';
import React from 'react';
import {intl} from 'utils/intl';

describe('<UpdateButtonContaier />', () => {
    test('should display update button', () => {
        render(<UpdateButtonContainer />);
        const buttonElement = screen.getByText(intl(INTL.POSTS.UPDATE));

        expect(buttonElement).toBeInTheDocument();
    });

    test('should button not disabled ', () => {
        render(<UpdateButtonContainer />);
        const buttonElement = screen.getByRole('button');

        expect(buttonElement).not.toHaveAttribute('disabled');
    });
});
