import {forward, sample} from 'effector';
import {createGate} from 'effector-react';
import {$displayName, $uid} from 'features/common/app/model/stores';
import {$formElem} from 'features/common/form/model';
import {resetForm, selectFile, submitForm} from 'features/common/form/model/events';
import {$form, $inputsApi} from 'features/common/form/model/stores';
import {resetPaginationIndexes} from 'features/firebase/pagination/models/events';
import {addPostFx, getPostsFx, removePostFx, saveImageFx} from 'features/posts/model/effects';
import {
    addNewPost,
    addPost,
    clearIndex,
    getPosts,
    onGetPosts,
    onRemove,
    removePost,
    resetDisable,
    setMode,
} from 'features/posts/model/events';
import {$idsList, $mode} from 'features/posts/model/stores';
import {iterate} from 'utils/effector/iterate';
import {getId} from 'utils/uniqueId';
import {getUrl} from 'utils/window/url';

export const Gate = createGate();

forward({
    from: Gate.open,
    to: [getPosts, $inputsApi.setCreatePostInputs],
});

forward({
    from: onGetPosts,
    to: getPostsFx,
});

forward({
    from: Gate.close,
    to: [clearIndex, resetPaginationIndexes],
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
    clock: submitForm,
    source: selectFile,
    filter: Gate.status,
    fn: file => ({file, url: `${getId()}/${file?.name}`}),
    target: saveImageFx,
});

sample({
    clock: saveImageFx.doneData,
    source: {author: $displayName, form: $form, uid: $uid},
    fn: ({author, form, uid}, img) => ({...(form as {text: string; title: string}), author, img, uid}),
    target: addPostFx,
});

sample({
    clock: addPostFx.doneData,
    source: selectFile,
    fn: (file, post) => ({...post, img: getUrl(file)}),
    target: [addNewPost, resetForm],
});

forward({
    from: onRemove,
    to: removePostFx,
});

forward({
    from: removePostFx.doneData,
    to: removePost,
});

sample({
    clock: removePostFx.failData,
    source: removePostFx,
    target: resetDisable,
});

sample({
    clock: getPostsFx.doneData,
    filter: collection => !!collection.length,
    target: setMode.prepend(() => 'SUCCESS'),
});

sample({
    clock: getPostsFx.doneData,
    source: $idsList,
    filter: (ids, collection) => !ids.length && !collection.length,
    target: setMode.prepend(() => 'NOT_FOUND'),
});

sample({
    clock: addPostFx.doneData,
    source: $mode,
    filter: mode => mode === 'NOT_FOUND',
    target: setMode.prepend(() => 'SUCCESS'),
});

sample({
    clock: addPostFx.doneData,
    source: $formElem,
    filter: Boolean,
    target: resetForm,
});

forward({
    from: getPostsFx.failData,
    to: setMode.prepend(() => 'FAILURE'),
});
