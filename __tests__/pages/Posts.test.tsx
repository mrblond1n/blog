import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {INTL} from 'constants/intl';
import Posts from 'pages/posts';
import React from 'react';
import {intl} from 'utils/intl';

describe('<Posts />', () => {
    test('should display posts page', async () => {
        render(<Posts />);
        const divElement = screen.getByRole('heading');

        expect(divElement.innerHTML).toBe('POSTS');
    });

    test('disable button after click', () => {
        render(<Posts />);
        const buttonElement = screen.getByText(intl(INTL.POSTS.UPDATE));

        userEvent.click(buttonElement);

        expect(buttonElement).toHaveAttribute('disabled');
    });
});
