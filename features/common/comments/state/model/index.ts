import {forward, sample} from 'effector';
import {addComment, getCommentsCollection, sendComment} from 'features/common/comments/state/model/events';
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
