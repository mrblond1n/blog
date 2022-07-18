import * as t from 'utils/validation';

const CommentDto = t.type({
    author: t.string,
    created_at: t.number,
    discussion_id: t.nullable(t.string),
    id: t.string,
    replies: t.nullable(t.number),
    reply_id: t.nullable(t.string),
    text: t.string,
    uid: t.string,
});

export const CommentCodec = CommentDto;
export const CommentsCodec = t.array(CommentDto);
export type TCommentDto = t.TypeOf<typeof CommentDto>;
