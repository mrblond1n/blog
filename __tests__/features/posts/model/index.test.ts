import {post, posts} from '__mocks__/post';
import {admin} from '__mocks__/user';
import {makeIndex} from '__mocks__/utils';
import {setUser} from 'features/common/app/model/events';
import 'features/posts/model';
import {getPostsFx, removePostFx} from 'features/posts/model/effects';
import {addPost, clearIndex, onRemove, removePost, resetDisable} from 'features/posts/model/events';
import {$disabledIndex, $idsList, $ownedIndex, $postsIndex} from 'features/posts/model/stores';

beforeEach(async () => {
    setUser(admin);
    getPostsFx.use(() => posts);
    await getPostsFx(null);
});

afterEach(() => {
    clearIndex();
});

afterAll(() => {
    $postsIndex.off(clearIndex);
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

describe('$disabledIndex', () => {
    test(`should set true on new added post`, async () => {
        const {id} = posts[1];

        onRemove(id);

        expect($disabledIndex.getState()[id]).toBeTruthy();
    });

    test(`should set false on new added post`, async () => {
        const {id} = posts[0];

        removePost(id);

        expect($disabledIndex.getState()[id]).toBeUndefined();
    });

    test(`should set false on reset`, async () => {
        const {id} = posts[0];

        resetDisable(id);

        expect($disabledIndex.getState()[id]).toBeFalsy();
    });
});

describe('$ownedIndex', () => {
    test(`should be falsy if uid !== uid of post`, async () => {
        addPost(post);
        expect($ownedIndex.getState()[post.id]).not.toBeTruthy();
    });

    test(`should set false on new added post`, async () => {
        const {id} = posts[0];

        removePost(id);

        expect($ownedIndex.getState()[id]).toBeUndefined();
    });
});
