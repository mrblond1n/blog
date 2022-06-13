import {forward, sample} from 'effector';
import {createGate} from 'effector-react';
import {$displayName, $uid} from 'features/common/app/model/stores';
import {onSubmit, selectFile} from 'features/common/form/model/events';
import {$form, $inputsApi} from 'features/common/form/model/stores';
import {addPostFx, getPostsFx, removePostFx, saveImageFx} from 'features/posts/model/effects';
import {addNewPost, addPost, getPosts, removePost, setMode} from 'features/posts/model/events';
import {iterate} from 'utils/effector/iterate';
import {getId} from 'utils/uniqueId';
import {getUrl} from 'utils/window/url';

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
    source: selectFile,
    filter: Gate.status,
    fn: file => ({file, url: `${getId()}/${file?.name}`}),
    target: saveImageFx,
});

sample({
    clock: saveImageFx.doneData,
    source: {author: $displayName, form: $form, uid: $uid, status: Gate.status},
    fn: ({author, form, uid}, img) => ({...(form as {text: string; title: string}), author, img, uid}),
    target: addPostFx,
});

sample({
    clock: addPostFx.doneData,
    source: selectFile,
    fn: (file, post) => ({...post, img: getUrl(file)}),
    target: addNewPost,
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
