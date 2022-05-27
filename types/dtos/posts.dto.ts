import * as t from 'utils/validation';

const PostDto = t.type({
    comments_count: t.withFallback(t.number, 0),
    id: t.string,
    text: t.string,
    title: t.string,
    uid: t.string,
    watches_count: t.withFallback(t.number, 0),
});

export const PostCodec = PostDto;
export const PostsCodec = t.array(PostDto);

export type TPostsDto = t.TypeOf<typeof PostsCodec>;
export type TPostDto = t.TypeOf<typeof PostCodec>;
