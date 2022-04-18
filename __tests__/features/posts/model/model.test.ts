import {getPostsFx, removePostFx} from 'features/posts/model/effects';
import {addPost, removePost} from 'features/posts/model/events';
import {$disabledIndex, $idsList, $postsIndex} from 'features/posts/model/stores';

const post = {text: 'text', title: 'title', id: 'id'};

describe('$postsIndex', () => {
    test('should add a new post in the $postsIndex', async () => {
        getPostsFx.use(() => [post]);
        await getPostsFx(null);

        expect($postsIndex.getState()).toEqual({[post.id]: post});
    });

    test('should remove the post from the $postsIndex', async () => {
        removePostFx.use(() => post.id);
        await removePostFx(post.id);

        expect($postsIndex.getState()).toEqual({});
    });
});

describe('$idsList', () => {
    test('should add a new id in the $idsList store', async () => {
        addPost(post);

        expect($idsList.getState().length).toBe(1);
    });

    test('should ignore the second same id in the $idsList store', async () => {
        addPost(post);

        expect($idsList.getState().length).toBe(1);
    });

    test('should remove the id from the $idsList store', async () => {
        removePostFx.use(() => post.id);
        await removePostFx(post.id);

        expect($idsList.getState().length).toBe(0);
    });
});

describe('$disabledIndex', () => {
    test('should add a new id in the $disabledIndex store', () => {
        addPost(post);

        expect($disabledIndex.getState()).toEqual({[post.id]: false});
    });

    test('should remove value to true during removePost action', async () => {
        addPost(post);
        removePostFx.use(() => post.id);
        await removePostFx(post.id);

        expect($disabledIndex.getState()).toEqual({});
    });

    test('should switch value to true during removePost action', () => {
        const newId = '1';

        addPost({...post, id: newId});
        removePost(newId);

        expect($disabledIndex.getState()).toEqual({[newId]: false});
    });
});
