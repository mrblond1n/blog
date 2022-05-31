import {forward, sample} from 'effector';
import {createGate} from 'effector-react';
import {$displayName, $uid} from 'features/common/app/model/stores';
import {onSubmit} from 'features/common/form/model/events';
import {$form, $inputsApi} from 'features/common/form/model/stores';
import {addPostFx, getPostsFx, removePostFx} from 'features/posts/model/effects';
import {addPost, getPosts, removePost, setMode} from 'features/posts/model/events';
import {iterate} from 'utils/effector/iterate';

export const Gate = createGate();

forward({
    from: Gate.open,
    to: [getPosts, $inputsApi.setCreatePostInputs],
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
    source: {author: $displayName, form: $form, uid: $uid, status: Gate.status},
    filter: ({uid, status}) => !!uid && !!status,
    fn: ({author, form, uid}) => ({...(form as {text: string; title: string}), author, uid}),
    target: addPostFx,
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
