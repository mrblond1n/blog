import * as t from 'utils/validation'

const LikedDto = t.array(t.string)

const CommentDto = t.type({
  author: t.string,
  created_at: t.number,
  discussion_id: t.nullable(t.string),
  disliked: t.withFallback(LikedDto, []),
  id: t.string,
  liked: t.withFallback(LikedDto, []),
  replies: t.withFallback(t.number, 0),
  reply_id: t.nullable(t.string),
  text: t.string,
  uid: t.string,
})

export const CommentCodec = CommentDto
export const CommentsCodec = t.array(CommentDto)
export type TCommentDto = t.TypeOf<typeof CommentDto>
