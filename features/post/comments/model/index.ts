import {sample} from 'effector';
import {getCommentsFx} from 'features/post/comments/model/effects';
import {$id} from 'features/post/index';
import {getPostFx} from 'features/post/state/model/effects';

sample({
    clock: getPostFx.doneData,
    source: $id,
    filter: Boolean,
    target: getCommentsFx,
});
