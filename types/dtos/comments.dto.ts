import * as t from 'utils/validation';

const CommentDto = t.type({
    id: t.string,
    post: t.string,
    text: t.string,
    title: t.string,
});

export const CommentCodec = CommentDto;
export const CommentsCodec = t.array(CommentDto);
export type TCommentDto = t.TypeOf<typeof CommentDto>;
