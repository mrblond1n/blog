import * as t from 'utils/validation';

const CommentDto = t.type({
    author: t.string,
    created_at: t.number,
    id: t.string,
    parent_id: t.nullable(t.string),
    reply_id: t.nullable(t.string),
    text: t.string,
    uid: t.string,
});

export const CommentCodec = CommentDto;
export const CommentsCodec = t.array(CommentDto);
export type TCommentDto = t.TypeOf<typeof CommentDto>;
