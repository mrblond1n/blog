import {createEvent} from 'effector';
import {getPostsFx} from 'features/posts/model/effects';
import {$postsIndex} from 'features/posts/model/stores';

const post = {text: 'text', title: 'title', id: 'id'};

let currentHandler: (params: unknown) => Promise<{title: string; text: string; id: string}[]>;

beforeEach(() => {
    currentHandler = getPostsFx.use.getCurrent();
});

afterEach(() => {
    getPostsFx.use(currentHandler);
});

const resetResults = createEvent();

afterAll(() => {
    $postsIndex.off(resetResults);
});

test('api requests will be added to the end of $postsIndex list', async () => {
    resetResults();
    getPostsFx.use(() => []);
    await getPostsFx(null);
    expect($postsIndex.getState()).toEqual({});
    getPostsFx.use(() => [post]);
    await getPostsFx(null);
    expect($postsIndex.getState()).toEqual({id: post});
});

// describe('<PostsContainer />', () => {
//     test('should render one post', async () => {
//         getPostsFx.use(() => [post]);
//         await getPostsFx(null);
//
//         render(<PostsContainer />);
//         const divElement = await screen.findByTestId(/post_id/i);
//
//         expect(divElement).toBeInTheDocument();
//     });
//
//     test('disabled button if it clicked', () => {
//         render(<PostsContainer />);
//         const buttonElement = screen.getByRole('button');
//
//         fireEvent.click(buttonElement);
//         expect(buttonElement).toHaveAttribute('disabled');
//     });

// test('after remove post deleted from DOM', async () => {
//     removePostFx.use(() => post.id);
//     await removePostFx(post.id);
//     render(<PostsContainer />);
//     const divElement = screen.queryByTestId(/post_id/i);
//
//     expect(divElement).not.toBeInTheDocument();
// });
//
// test('after remove effect store is clear', async () => {
//     removePostFx.use(() => post.id);
//     await removePostFx(post.id);
//     render(<PostsContainer />);
//
//     expect($postsIndex.getState()).toEqual({});
// });
// });
