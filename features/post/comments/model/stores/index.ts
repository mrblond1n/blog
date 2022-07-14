import {combine, createStore, restore} from 'effector';
import {Gate} from 'features/post';
import {sendCommentFx} from 'features/post/comments/model/effects';
import {
    addComment,
    changeAnswerText,
    clearAnswerStack,
    onAnswer,
    openAnswerField,
    setMode,
} from 'features/post/comments/model/events';
import {TCommentDto} from 'types/dtos/comments.dto';
import {getById} from 'utils/effector/getById';
import {createIndex} from 'utils/stack';

export const $mode = restore(setMode, 'LOADING');

export const $commentsIndex = createStore(createIndex<TCommentDto>())
    .on(addComment, (index, comment) => index.set({key: comment.id, value: comment}))
    .on(Gate.close, index => index.clear())
    .map(value => value.getRaw());

export const $idsList = createStore<string[]>([])
    .on(addComment, (state, {id}) => (state.includes(id) ? state : [...state, id]))
    .reset(Gate.close);

export const $replyIdsIndex = createStore(createIndex<string[]>())
    .on(addComment, (index, comment) => {
        return comment.parent_id
            ? index.updateOrCreate({
                  key: comment.parent_id,
                  create: () => [comment.id],
                  update: prev => [...prev, comment.id],
              })
            : index.set({key: comment.id, value: []});
    })
    .map(value => value.getRaw());

export const $commentsIdsList = combine($replyIdsIndex, Object.keys);

export const $answerFieldIndex = createStore(createIndex<boolean>())
    .on(openAnswerField, (index, id) => index.set({key: id, value: true}))
    .on(clearAnswerStack, index => index.clear())
    .map(value => value.getRaw());

export const $answerTextIndex = createStore(createIndex<string>())
    .on(changeAnswerText, (index, {key, value}) => index.set({key, value}))
    .on(sendCommentFx.doneData, index => index.clear())
    .map(value => value.getRaw());

export const $replyId = restore(onAnswer, '');

export const $repliedComment = getById($commentsIndex, $replyId);
export const $currentAnswerText = getById($answerTextIndex, $replyId).map(value => value || '');
