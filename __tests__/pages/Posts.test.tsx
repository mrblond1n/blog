import {render, screen} from '@testing-library/react';
import Posts from 'pages/posts';
import React from 'react';

describe('<Post />', () => {
    test('should display posts page', async () => {
        render(<Posts />);
        const divElement = screen.getByRole('heading');

        expect(divElement.innerHTML).toBe('POSTS');
    });
});
