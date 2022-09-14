import {render, screen} from '@testing-library/react';
import {posts} from '__mocks__/post';
import {PostsContainer} from 'features/pages/posts/containers/PostsContainer';
import {getPostsFx} from 'features/pages/posts/model/effects';
import React from 'react';

import 'features';

describe('<PostsContainer />', () => {
    test('should render one post', async () => {
        getPostsFx.use(() => posts);
        await getPostsFx(null);

        render(<PostsContainer />);
        const divElement = await screen.findAllByTestId(/post_/i);

        expect(divElement[0]).toBeInTheDocument();
    });
});
