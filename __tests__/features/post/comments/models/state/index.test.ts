import {comment, comments} from '__mocks__/comments';
import {post} from '__mocks__/post';
import {makeIndex} from '__mocks__/utils';
import 'features/common/comments/';
import {addComment, clearComments, clearDiscussion, removeComment} from 'features/common/comments/state/model/events';
import {$commentsIndex, $discussionIdsIndex, $discussionIdsList} from 'features/common/comments/state/model/stores';
import 'features/post/comments/models';
import {getCommentsFx} from 'features/post/comments/models/get/effects';
import {removeCommentFx} from 'features/post/comments/models/remove/effects';
import {sendCommentFx} from 'features/post/comments/models/send/effects';

beforeAll(async () => {
    getCommentsFx.use(() => comments);
    await getCommentsFx(post.id);
});

afterAll(() => {
    clearComments();
});

describe('$commentsIndex', () => {
    test(`should be $commentsIndex is correct`, () => {
        expect($commentsIndex.getState()).toEqual(makeIndex(comments));
    });

    test('should $commentsIndex be one more item', async () => {
        sendCommentFx.use(() => comment);
        await sendCommentFx(comment);

        expect($commentsIndex.getState()).toEqual(makeIndex([...comments, comment]));
    });

    test('after remove comment, it should not be in store', async () => {
        const item = comments[0];

        removeCommentFx.use(() => item.id);
        await removeCommentFx({id: item.id, path: ''});

        expect($commentsIndex.getState()[item.id]).toBeUndefined();
    });
});

describe('$discussionIdsIndex', () => {
    test(`keys of $discussionIdsIndex should be as comments without discussion id length`, () => {
        expect(Object.keys($discussionIdsIndex.getState()).length).toEqual(
            Object.values($commentsIndex.getState()).filter(({discussion_id}) => !discussion_id).length
        );
    });

    test('lengths should be equal in case remove reply comment', () => {
        const firstMatchItem = comments.find(({discussion_id}) => !!discussion_id) || comments[0];

        removeComment(firstMatchItem);

        const arrOfDiscussionsId = Object.keys($discussionIdsIndex.getState());
        const arrayOfDiscussionComment = comments.filter(({discussion_id}) => !discussion_id);

        expect(arrOfDiscussionsId.length).toEqual(arrayOfDiscussionComment.length);
    });

    test('lengths should be not equal in case remove reply comment', () => {
        const commentsArr = Object.values($commentsIndex.getState()).filter(({discussion_id}) => !discussion_id);
        const [item] = commentsArr;

        removeComment(item);

        const arrOfDiscussionsId = Object.keys($discussionIdsIndex.getState());

        expect(arrOfDiscussionsId.length).toEqual(commentsArr.length - 1);
    });

    test('after clear discussion his array should be empty', () => {
        Object.values($commentsIndex.getState())
            .filter(({discussion_id}) => !discussion_id)
            .forEach(item => {
                clearDiscussion(item.id);
                expect($discussionIdsIndex.getState()[item.id].length).toEqual(0);
            });
    });
});

describe('$discussionIdsList', () => {
    test(`keys of $discussionIdsIndex should be as comments without discussion id length`, () => {
        const index = $commentsIndex.getState();
        const arr = Object.values(index).filter(({discussion_id}) => !discussion_id);

        expect(Object.keys($discussionIdsList.getState()).length).toEqual(arr.length);
    });

    test('lengths should be equal in case remove reply comment', () => {
        const index = $commentsIndex.getState();
        const arr = Object.values(index).filter(({discussion_id}) => !!discussion_id);
        const discussionArr = Object.values(index).filter(({discussion_id}) => !discussion_id);
        const [item] = arr;

        removeComment(item);

        const idsList = $discussionIdsList.getState();

        expect(idsList.length).toEqual(discussionArr.length);
    });

    test('lengths should be not equal in case remove discussion comment', () => {
        const index = $commentsIndex.getState();
        const arr = Object.values(index).filter(({discussion_id}) => !discussion_id);
        const [item] = arr;

        removeComment(item);

        const idsList = $discussionIdsList.getState();

        expect(idsList.length).not.toEqual(arr.length);
    });

    test('lengths should be equal in case add discussion comment', () => {
        const index = $commentsIndex.getState();
        const arr = Object.values(index).filter(({discussion_id}) => !discussion_id);

        addComment({...comment, discussion_id: 'example'});

        const idsList = $discussionIdsList.getState();

        expect(idsList.length).toEqual(arr.length);
    });

    test('lengths should be not equal in case add reply comment', () => {
        const index = $commentsIndex.getState();
        const arr = Object.values(index).filter(({discussion_id}) => !discussion_id);

        addComment(comment);

        const idsList = $discussionIdsList.getState();

        expect(idsList.length).not.toEqual(arr.length);
    });
});
