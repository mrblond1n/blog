import {forward, sample} from 'effector';
import {createGate} from 'effector-react';
import {$displayName, $uid} from 'features/common/app/model/stores';
import {onSubmit, selectFile} from 'features/common/form/model/events';
import {$form, $inputsApi} from 'features/common/form/model/stores';
import {addPostFx, getImageUrlFx, getPostsFx, removePostFx, saveImageFx} from 'features/posts/model/effects';
import {addNewPost, addPost, addPostImage, getPosts, removePost, setMode} from 'features/posts/model/events';
import {iterate} from 'utils/effector/iterate';
import {getUrl} from 'utils/window/url';

export const Gate = createGate();

forward({
    from: Gate.open,
    to: [getPosts, $inputsApi.setCreatePostInputs],
});

sample({
    clock: addPost,
    fn: post => ({...post, img: `${post.id}/${post.img}`}),
    target: getImageUrlFx,
});

sample({
    clock: getImageUrlFx.done,
    fn: ({params, result}) => ({key: params.id, value: result}),
    target: addPostImage,
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
    fn: ({author, form, uid}) => ({...(form as {text: string; title: string; img: string}), author, uid}),
    target: addPostFx,
});

sample({
    clock: addPostFx.doneData,
    source: selectFile,
    fn: (file, post) => ({file, url: `${post.id}/${post.img}`}),
    target: saveImageFx,
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
