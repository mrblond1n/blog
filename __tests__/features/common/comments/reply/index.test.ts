import {comment, comments, reply} from '__mocks__/comments';
import {admin} from '__mocks__/user';
import {setUser} from 'features/app/model/events';
import 'features/common/comments';
import {addReply, closeOpened, onOpen, onReply, onToggle} from 'features/common/comments/reply/model/events';
import {
    $discussionId,
    $openedIndex,
    $prevReplyId,
    $replyId,
    $replyIdsIndex,
    $viewedRepliesIndex,
} from 'features/common/comments/reply/model/stores';
import {clearComments, getCommentsCollection, removeComment} from 'features/common/comments/state/model/events';

beforeAll(() => {
    setUser(admin);
    getCommentsCollection(comments);
});

afterAll(() => {
    clearComments();
});

describe('$openedIndex', () => {
    comments.forEach(({id}, index) => {
        test('after executing the opening function, the truth flag must be set', () => {
            onReply(id);
            expect($openedIndex.getState()[id]).toBeTruthy();
        });

        if (index > 0) {
            test('after executing the opening function to another, the truth flag must be set to falsy', () => {
                const prevItem = comments[index - 1];

                onReply(id);
                expect($openedIndex.getState()[prevItem.id]).toBeFalsy();
            });
        }

        test('after executing the closing function, the falsy flag must be set', () => {
            onOpen(id);
            closeOpened(id);
            expect($openedIndex.getState()[id]).toBeFalsy();
        });
    });
});

describe('$viewedRepliesIndex', () => {
    comments.forEach(({id}) => {
        test('after executing the toggling function, the truth flag must be set ', () => {
            onToggle(id);
            expect($viewedRepliesIndex.getState()[id]).toBeTruthy();
        });

        test('after double executing the toggling function, the falsy flag must be set ', () => {
            onToggle(id);
            expect($viewedRepliesIndex.getState()[id]).toBeFalsy();
        });
    });
});

describe('$replyIdsIndex', () => {
    test('reply should be added to $replyIdsIndex', () => {
        addReply(reply);

        expect($replyIdsIndex.getState()[reply.discussion_id]).toEqual([reply.id]);
    });

    test('comment should not be added to $replyIdsIndex', () => {
        addReply(comment);

        expect($replyIdsIndex.getState()[reply.discussion_id]).toEqual([reply.id]);
    });

    test('reply should be removed from $replyIdsIndex', () => {
        removeComment(reply);

        expect($replyIdsIndex.getState()[reply.discussion_id]).toEqual([]);
    });
});

describe('$replyIdHistory', () => {
    comments.forEach((item, index) => {
        test('$replyId must be set after the execution of the onReply function on the passed id', () => {
            const {id} = item;

            onReply(id);
            expect($replyId.getState()).toEqual(id);
        });

        if (index > 0) {
            test('$prevReplyId must be set after the execution of the onReply function on the prev passed id', () => {
                onReply(item.id);
                expect($prevReplyId.getState()).toEqual(comments[index - 1].id);
            });
        }
    });
});

describe('$discussionIdHistory', () => {
    comments
        .filter(({discussion_id}) => !!discussion_id)
        .forEach(item => {
            test('$discussionId must be set after the execution of the onReply function on the passed id', () => {
                onReply(item.id);
                expect($discussionId.getState()).toEqual(item.discussion_id);
            });
        });
});
