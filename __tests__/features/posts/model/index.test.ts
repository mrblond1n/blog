import {post, posts} from '__mocks__/post';
import {makeIndex} from '__mocks__/utils';
import 'features/posts/model';
import {getPostsFx, removePostFx} from 'features/posts/model/effects';
import {addPost, clearIndexes} from 'features/posts/model/events';
import {$idsList, $postsIndex} from 'features/posts/model/stores';

beforeEach(async () => {
    getPostsFx.use(() => posts);
    await getPostsFx(null);
});

afterEach(() => {
    clearIndexes();
});

describe('$postsIndexes', () => {
    test(`should be ${posts.length} posts in index`, () => {
        expect($postsIndex.getState()).toEqual(makeIndex(posts));
    });

    test(`should $postsIndex be one less item`, async () => {
        const postId = posts[0].id;

        removePostFx.use(() => postId);
        await removePostFx(postId);

        expect($postsIndex.getState()).toEqual(makeIndex(posts.filter(({id}) => id !== postId)));
    });

    test(`should $postsIndex be one more item`, async () => {
        addPost(post);

        expect($postsIndex.getState()).toEqual(makeIndex([...posts, post]));
    });
});

describe('$idsList', () => {
    test(`should be ${posts.length} posts in list`, async () => {
        expect($idsList.getState().length).toEqual(posts.filter(Boolean).length);
    });

    test(`should be ${posts.length - 1} posts in list after remove post`, async () => {
        const item = posts[0];

        removePostFx.use(() => item.id);
        await removePostFx(item.id);

        expect($idsList.getState().length).toEqual(posts.length - 1);
    });

    test(`should be ${posts.length + 1} posts in list after add post`, async () => {
        addPost(post);

        expect($idsList.getState().length).toEqual(posts.length + 1);
    });
});
