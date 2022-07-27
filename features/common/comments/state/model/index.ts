import {forward, sample} from 'effector';
import {
    addComment,
    getCommentsCollection,
    getRemovedComments,
    removeComment,
    sendComment,
} from 'features/common/comments/state/model/events';
import {$commentsIndex} from 'features/common/comments/state/model/stores';
import {submitForm} from 'features/common/form/model/events';
import {$form} from 'features/common/form/model/stores';
import {iterate} from 'utils/effector/iterate';

sample({
    clock: submitForm,
    source: $form,
    filter: ({text}) => !!text,
    fn: ({text}) => ({text}),
    target: sendComment,
});

const newCommentEvent = iterate(getCommentsCollection);

forward({
    from: newCommentEvent,
    to: addComment,
});

sample({
    clock: removeComment,
    source: $commentsIndex,
    filter: (_, {replies}) => replies >= 1,
    fn: (index, {id}) => Object.values(index).filter(({discussion_id}) => discussion_id === id),
    target: getRemovedComments,
});

const newRemoveCommentEvent = iterate(getRemovedComments);

forward({
    from: newRemoveCommentEvent,
    to: removeComment,
});
