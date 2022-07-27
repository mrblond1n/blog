import {comments} from '__mocks__/comments';
import {TPostDto} from 'types/dtos/posts.dto';

export const post: TPostDto = {
    uid: 'dmPZOmaLoDU9qoGh66bB1xNzA2OS',
    img: 'http://localhost:9199/v0/b/nikita-kirdiapin-blog.appspot.com/o/4f0997a0-0f60-4f3f-a4fc-83c5bb47f830%2Fpexels-camila-benA%CC%83%C2%ADtez-10970424.jpg?alt=media&token=14ae16d7-2dc0-400e-8448-d7a98c4b0883',
    author: 'qwe qwe',
    created_at: 1658410408209,
    text: 'aaaaaaaaaa',
    title: 'taaaaaaat',
    comments_count: comments.length,
    watches_count: 0,
    id: 'qwedsaasdaskxkkzj',
};

export const posts = [
    {
        uid: 'q3TaIeyqSLEwdT1W1Mg6Cr9mHRoZ',
        img: 'http://localhost:9199/v0/b/nikita-kirdiapin-blog.appspot.com/o/4f0997a0-0f60-4f3f-a4fc-83c5bb47f830%2Fpexels-camila-benA%CC%83%C2%ADtez-10970424.jpg?alt=media&token=14ae16d7-2dc0-400e-8448-d7a98c4b0883',
        author: 'Nikita Dark',
        created_at: 1658410408209,
        text: '213',
        title: 'test',
        comments_count: 4,
        watches_count: 33,
        id: 'b43JG327IoBY5FMeTNfD',
    },
    {
        uid: 'q3TaIeyqSLEwdT1W1Mg6Cr9mHRoZ',
        img: 'http://localhost:9199/v0/b/nikita-kirdiapin-blog.appspot.com/o/2cc809c6-458e-4c5f-9d7c-0c00fe14e076%2Fphoto_2022-07-18%2016.39.29.jpeg?alt=media&token=f4cf0e83-ae2f-43ce-9689-b06ad4890763',
        author: 'Nikita Dark',
        created_at: 1658494848703,
        text: 'asd',
        title: 'qweqwe',
        watches_count: 1,
        comments_count: 12,
        id: '7msUTNj3Ziim6THkPuQG',
    },
    {
        uid: 'q3TaIeyqSLEwdT1W1Mg6Cr9mHRoZ',
        img: 'http://localhost:9199/v0/b/nikita-kirdiapin-blog.appspot.com/o/4a498de5-be69-4037-a1bb-a0536d2d56c5%2Fphoto_2022-07-18%2016.39.29.jpeg?alt=media&token=cb7b3b48-f0d3-43d0-b632-a384a24ef764',
        author: 'Nikita Dark',
        created_at: 1658494857793,
        text: 'ssaaaswwwq',
        title: 'ewess',
        watches_count: 1,
        comments_count: 3,
        id: '9vMBSQfOCgL9cF9tYFzR',
    },
    {
        uid: 'q3TaIeyqSLEwdT1W1Mg6Cr9mHRoZ',
        img: 'http://localhost:9199/v0/b/nikita-kirdiapin-blog.appspot.com/o/c51bd667-8108-4e91-bcc8-c3749973195a%2FFXQlwh_XoAASt_x.jpeg?alt=media&token=7d7c30d0-1bac-4e25-9ff8-367c85cd03ea',
        author: 'Nikita Dark',
        created_at: 1658494865604,
        text: '123123',
        title: 'ewes1',
        watches_count: 2,
        comments_count: 1,
        id: 'Rchx0y95yny0vuMRLD7x',
    },
];
