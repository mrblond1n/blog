import {post} from '__mocks__/post';
import 'features/pages/post/state/model';
import {getPostFx} from 'features/pages/post/state/model/effects';
import {updatePostComments} from 'features/pages/post/state/model/events';
import {$post} from 'features/pages/post/state/model/stores';

beforeEach(async () => {
    getPostFx.use(() => post);
    await getPostFx(post.id);
});

describe('$post', () => {
    test(`should be changed post comments_count`, () => {
        updatePostComments({comments_count: 10});

        expect($post.getState()?.comments_count).toEqual(10);
    });
});
