import {forward, sample} from 'effector';
import {createGate} from 'effector-react';
import {onSubmit} from 'features/form/model/events';
import {$form, $inputsApi, changeButtonText} from 'features/form/model/stores';
import {addPostFx, getPostsFx, removePostFx} from 'features/posts/model/effects';
import {addNewPost, addPost, getPosts, removePost, setMode, updatePosts} from 'features/posts/model/events';
import {iterate} from 'utils/effector/iterate';

export const Gate = createGate();

forward({
    from: [Gate.open, updatePosts],
    to: [changeButtonText.toCreatePost, getPosts, $inputsApi.setCreatePostInputs],
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

sample({
    clock: onSubmit,
    source: $form,
    filter: Gate.status,
    target: addPostFx,
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
