import {sample} from 'effector';
import {$form} from 'features/common/form/model/stores';
import {addCommentFx, getCommentsFx} from 'features/post/comments/model/effects';
import {addComment} from 'features/post/comments/model/events';
import {$id} from 'features/post/index';
import {getPostFx} from 'features/post/state/model/effects';

sample({
    clock: getPostFx.doneData,
    source: $id,
    filter: Boolean,
    target: getCommentsFx,
});

sample({
    clock: addComment,
    source: $form,
    fn: (form, post) => ({...(form as {title: string; text: string}), post}),
    target: addCommentFx,
});
