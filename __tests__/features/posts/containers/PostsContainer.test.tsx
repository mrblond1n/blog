import {render, screen} from '@testing-library/react';
import {PostsContainer} from 'features/posts/containers/PostsContainer';
import {getPostsFx} from 'features/posts/model/effects';
import React from 'react';

const post = {text: 'text', title: 'title', id: 'id', author: 'author'} as any;

describe('<PostsContainer />', () => {
    test('should render one post', async () => {
        getPostsFx.use(() => [post]);
        await getPostsFx(null);

        render(<PostsContainer />);
        const divElement = await screen.findByTestId(/post_id/i);

        expect(divElement).toBeInTheDocument();
    });
});
