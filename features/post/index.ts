import {forward, guard, sample} from 'effector';
import {createGate} from 'effector-react';
import {$displayName, $uid} from 'features/common/app/model/stores';
import {updateCommentLikes} from 'features/common/comments/liked/model/events';
import {addReply, getReplies, sendReply} from 'features/common/comments/reply/model/events';
import {$comment, $discussionId} from 'features/common/comments/reply/model/stores';
import {sendComment, updateComment} from 'features/common/comments/state/model/events';
import {$commentsIndex} from 'features/common/comments/state/model/stores';
import {$inputsApi} from 'features/common/form/model/stores';
import {getCommentsFx, sendCommentFx, sendReplyFx, updateCommentFx} from 'features/post/comments/model/effects';
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

sample({
    clock: sample({
        clock: sendReplyFx,
        source: $comment,
        filter: Boolean,
        fn: ({replies, ...comment}) => ({...comment, replies: replies ? ++replies : 1}),
    }),
    source: $id,
    filter: Boolean,
    fn: (id, comment) => ({...comment, path: id}),
    target: updateCommentFx,
});

sample({
    clock: updateCommentLikes,
    source: {index: $commentsIndex, id: $id},
    fn: ({index, id}, {key, ...data}) => {
        const comment = index[key];
        const path = comment.discussion_id ? `${id}/comments/${comment.discussion_id}` : id || '';

        return {...comment, ...data, path};
    },
    target: updateCommentFx,
});

forward({
    from: sendReplyFx.doneData,
    to: addReply,
});

forward({
    from: updateCommentFx.doneData,
    to: updateComment,
});

sample({
    clock: getReplies,
    source: {id: $id, discussionId: $discussionId},
    filter: ({id}) => !!id,
    fn: ({id, discussionId}) => `${id}/comments/${discussionId}`,
    target: getCommentsFx,
});
