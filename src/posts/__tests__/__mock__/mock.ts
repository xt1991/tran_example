import { IPost, postStatus } from '../../interface';

export const postData: IPost = {
  title: 'title',
  intro: 'intro',
  author: 'author',
  content: 'content',
  tag: ['a', 'b', 'c'],
  status: postStatus.ACTIVE
};
