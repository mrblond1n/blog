import {forward, sample} from 'effector';
import {$displayName} from 'features/common/app/model/stores';
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
    source: {form: $form, author: $displayName},
    fn: ({form, author}, post) => ({...(form as {title: string; text: string}), post, author}),
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
