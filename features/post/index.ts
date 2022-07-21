import {forward, guard, sample} from 'effector';
import {createGate} from 'effector-react';
import {$displayName, $uid} from 'features/common/app/model/stores';
import {addReply, getReplies, sendReply} from 'features/common/comments/reply/model/events';
import {$discussionId} from 'features/common/comments/reply/model/stores';
import {sendComment} from 'features/common/comments/state/model/events';
import {$inputsApi} from 'features/common/form/model/stores';
import {getCommentsFx, sendCommentFx, sendReplyFx} from 'features/post/comments/model/effects';
import {getPostFx} from 'features/post/state/model/effects';
import {setMode} from 'features/post/state/model/events';

export const Gate = createGate<{id?: string}>();
export const $id = Gate.state.map(x => x?.id);

sample({
    clock: [
        Gate.open,
        guard({
            source: $id,
            filter: Boolean,
        }),
    ],
    source: $id,
    filter: Boolean,
    target: [getPostFx, setMode.prepend(() => 'LOADING'), $inputsApi.setAddCommentInputs],
});

sample({
    clock: sample({
        clock: sendReply,
        source: $id,
        filter: Boolean,
        fn: (id, comment) => ({...comment, id, disliked: [], liked: []}),
    }),
    source: {uid: $uid, author: $displayName},
    filter: Gate.status,
    fn: (user, comment) => ({...comment, ...user}),
    target: sendReplyFx,
});

sample({
    clock: sample({
        clock: sendComment,
        source: $id,
        filter: Boolean,
        fn: (id, comment) => ({...comment, id, disliked: [], liked: []}),
    }),
    source: {uid: $uid, author: $displayName},
    filter: Gate.status,
    fn: (user, comment) => ({...comment, ...user}),
    target: sendCommentFx,
});

forward({
    from: sendReplyFx.doneData,
    to: addReply,
});

sample({
    clock: getReplies,
    source: {id: $id, discussionId: $discussionId},
    filter: ({id}) => !!id,
    fn: ({id, discussionId}) => `${id}/comments/${discussionId}`,
    target: getCommentsFx,
});
