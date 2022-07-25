import {comment, comments} from '__mocks__/comments';
import {post} from '__mocks__/post';
import {admin} from '__mocks__/user';
import {makeIndex} from '__mocks__/utils';
import {setUser} from 'features/common/app/model/events';
import {
    addComment,
    clearComments,
    clearDiscussion,
    removeComment,
    updateComment,
} from 'features/common/comments/state/model/events';
import {$commentsIndex, $discussionIdsIndex, $discussionIdsList} from 'features/common/comments/state/model/stores';
import 'features/post/comments/models';
import {getCommentsFx} from 'features/post/comments/models/get/effects';
import {removeCommentFx} from 'features/post/comments/models/remove/effects';
import {sendCommentFx} from 'features/post/comments/models/send/effects';

beforeEach(async () => {
    setUser(admin);
    getCommentsFx.use(() => comments);
    await getCommentsFx(post.id);
});

afterEach(() => {
    clearComments();
});

describe('$commentsIndex', () => {
    test(`should be $commentsIndex is correct`, () => {
        expect($commentsIndex.getState()).toEqual(makeIndex(comments));
    });

    test('should $postsIndex be one more item', async () => {
        sendCommentFx.use(() => comment);
        await sendCommentFx(comment);

        expect($commentsIndex.getState()).toEqual(makeIndex([...comments, comment]));
    });

    test('should $postsIndex be one less item', async () => {
        const item = comments[0];

        removeCommentFx.use(() => item.id);
        await removeCommentFx({id: item.id, path: ''});

        expect($commentsIndex.getState()).toEqual(makeIndex(comments.filter(({id}) => id !== item.id)));
    });

    test('should be updated comment', () => {
        const item = comments[0];

        updateComment({...item, replies: 10});

        const itemInIndex = $commentsIndex.getState()[item.id];

        expect(itemInIndex.replies).toEqual(10);
    });
});

describe('$discussionIdsIndex', () => {
    test(`keys of $discussionIdsIndex should be as comments without discussion id length`, () => {
        expect(Object.keys($discussionIdsIndex.getState()).length).toEqual(
            comments.filter(({discussion_id}) => !discussion_id).length
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
        const firstMatchItem = comments.find(({discussion_id}) => !discussion_id) || comments[0];

        removeComment(firstMatchItem);

        const arrOfDiscussionsId = Object.keys($discussionIdsIndex.getState());
        const arrayOfDiscussionComment = comments.filter(({discussion_id}) => !discussion_id);

        expect(arrOfDiscussionsId.length).toEqual(arrayOfDiscussionComment.length - 1);
    });

    test('after clear discussion his array should be empty', () => {
        comments
            .filter(({discussion_id}) => !discussion_id)
            .forEach(item => {
                clearDiscussion(item.id);
                expect($discussionIdsIndex.getState()[item.id].length).toEqual(0);
            });
    });
});

describe('$discussionIdsList', () => {
    test(`keys of $discussionIdsIndex should be as comments without discussion id length`, () => {
        expect(Object.keys($discussionIdsList.getState()).length).toEqual(
            comments.filter(({discussion_id}) => !discussion_id).length
        );
    });

    test('lengths should be equal in case remove reply comment', () => {
        const firstMatchItem = comments.find(({discussion_id}) => !!discussion_id) || comments[0];

        removeComment(firstMatchItem);

        const idsList = $discussionIdsList.getState();
        const arrayOfDiscussionComment = comments.filter(({discussion_id}) => !discussion_id);

        expect(idsList.length).toEqual(arrayOfDiscussionComment.length);
    });

    test('lengths should be not equal in case remove discussion comment', () => {
        const firstMatchItem = comments.find(({discussion_id}) => !discussion_id) || comments[0];

        removeComment(firstMatchItem);

        const idsList = $discussionIdsList.getState();
        const arrayOfDiscussionComment = comments.filter(({discussion_id}) => !discussion_id);

        expect(idsList.length).not.toEqual(arrayOfDiscussionComment.length);
    });

    test('lengths should be equal in case add discussion comment', () => {
        addComment({...comment, discussion_id: 'example'});

        const idsList = $discussionIdsList.getState();
        const arrayOfDiscussionComment = comments.filter(({discussion_id}) => !discussion_id);

        expect(idsList.length).toEqual(arrayOfDiscussionComment.length);
    });

    test('lengths should be not equal in case add reply comment', () => {
        addComment(comment);

        const idsList = $discussionIdsList.getState();
        const arrayOfDiscussionComment = comments.filter(({discussion_id}) => !discussion_id);

        expect(idsList.length).not.toEqual(arrayOfDiscussionComment.length);
    });
});
