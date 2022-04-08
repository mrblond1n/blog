import * as t from 'utils/validation';

const PostDto = t.type({
    title: t.string,
    text: t.string,
    id: t.string,
});

export const PostCodec = PostDto;
export const PostsCodec = t.array(PostDto);

export type TPostsDto = t.TypeOf<typeof PostsCodec>;
export type TPostDto = t.TypeOf<typeof PostCodec>;
