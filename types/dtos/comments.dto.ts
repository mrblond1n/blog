import * as t from 'utils/validation';

const CommentDto = t.type({
    id: t.string,
    post: t.string,
    text: t.string,
    title: t.string,
});

export const CommentsCodec = t.array(CommentDto);
