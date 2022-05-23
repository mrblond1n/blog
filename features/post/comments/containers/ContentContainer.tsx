import {CommentFormContainer} from 'features/post/comments/containers/CommentFormContainer';
import {CommentsContainer} from 'features/post/comments/containers/CommentsContainer';
import React from 'react';

export const ContentContainer = () => {
    return (
        <div>
            <CommentsContainer />
            <CommentFormContainer />
        </div>
    );
};
