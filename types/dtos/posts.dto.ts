import * as t from 'utils/validation';

const PostDto = t.type({
    id: t.string,
    text: t.string,
    title: t.string,
    uid: t.string,
});

export const PostCodec = PostDto;
export const PostsCodec = t.array(PostDto);

export type TPostsDto = t.TypeOf<typeof PostsCodec>;
export type TPostDto = t.TypeOf<typeof PostCodec>;
