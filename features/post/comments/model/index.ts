import {forward, sample} from 'effector';
import {$displayName, $uid} from 'features/common/app/model/stores';
import {$form} from 'features/common/form/model/stores';
import {sendCommentFx, getCommentsFx} from 'features/post/comments/model/effects';
import {addComment, sendComment} from 'features/post/comments/model/events';
import {$id} from 'features/post/index';
import {getPostFx} from 'features/post/state/model/effects';
import {iterate} from 'utils/effector/iterate';

sample({
    clock: getPostFx.doneData,
    source: $id,
    filter: Boolean,
    target: getCommentsFx,
});

sample({
    clock: sendComment,
    source: {form: $form, author: $displayName, uid: $uid},
    fn: ({form, author, uid}, post) => ({...(form as {text: string}), post, author, uid}),
    target: sendCommentFx,
});

forward({
    from: sendCommentFx.doneData,
    to: addComment,
});

const newCommentEvent = iterate(getCommentsFx.doneData);

forward({
    from: newCommentEvent,
    to: addComment,
});
