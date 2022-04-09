import {fireEvent, render, screen} from '@testing-library/react';
import {PostsContainer} from 'features/posts/containers/PostsContainer';
import {getPostsFx, removePostFx} from 'features/posts/model/effects';
import {$postsIndex} from 'features/posts/model/stores';
import React from 'react';

const post = {text: 'text', title: 'title', id: 'id'};

describe('<PostsContainer />', () => {
    test('should render one post', async () => {
        getPostsFx.use(() => [post]);
        await getPostsFx(null);

        render(<PostsContainer />);
        const divElement = await screen.findByTestId(/post_id/i);

        expect(divElement).toBeInTheDocument();
    });

    test('disabled button if it clicked', () => {
        render(<PostsContainer />);
        const buttonElement = screen.getByRole('button');

        fireEvent.click(buttonElement);
        expect(buttonElement).toHaveAttribute('disabled');
    });

    test('after remove post deleted from DOM', async () => {
        removePostFx.use(() => post.id);
        await removePostFx(post.id);
        render(<PostsContainer />);
        const divElement = screen.queryByTestId(/post_id/i);

        expect(divElement).not.toBeInTheDocument();
    });

    test('after remove effect store is clear', async () => {
        removePostFx.use(() => post.id);
        await removePostFx(post.id);
        render(<PostsContainer />);

        expect($postsIndex.getState()).toEqual({});
    });
});
