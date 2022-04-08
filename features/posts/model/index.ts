import {forward} from 'effector';
import {createGate} from 'effector-react';
import {addPostFx, getPostsFx, removePostFx} from 'features/posts/model/effects';
import {addNewPost, addPost, getPosts, onClick, removePost, setMode} from 'features/posts/model/events';
import {iterate} from 'utils/effector/iterate';

export const Gate = createGate();

forward({
    from: [Gate.open, onClick],
    to: getPosts,
});

const newPostEvent = iterate(getPostsFx.doneData);

forward({
    from: newPostEvent,
    to: addPost,
});

forward({
    from: getPosts,
    to: [getPostsFx, setMode.prepend(() => 'LOADING')],
});

forward({
    from: addNewPost,
    to: addPostFx,
});

forward({
    from: addPostFx.doneData,
    to: addPost,
});

forward({
    from: removePost,
    to: removePostFx,
});

forward({
    from: getPostsFx.doneData,
    to: setMode.prepend(() => 'SUCCESS'),
});

forward({
    from: getPostsFx.failData,
    to: setMode.prepend(() => 'FAILURE'),
});
