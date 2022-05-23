import * as t from 'utils/validation';

const CommentDto = t.type({
    author: t.string,
    id: t.string,
    post: t.string,
    text: t.string,
    created_at: t.number,
});

export const CommentCodec = CommentDto;
export const CommentsCodec = t.array(CommentDto);
export type TCommentDto = t.TypeOf<typeof CommentDto>;
