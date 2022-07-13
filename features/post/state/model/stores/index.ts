import {combine, restore} from 'effector';
import {getPostFx} from 'features/post/state/model/effects';
import {setMode} from 'features/post/state/model/events';
import {Gate} from 'features/post/index';

const $post = restore(getPostFx.doneData, null).reset(Gate.close);

export const $author = combine($post, post => post?.author || '');
export const $body = combine($post, post => post?.text || '');
export const $createdAt = combine($post, post => post?.created_at || '');
export const $img = combine($post, post => post?.img || '');
export const $title = combine($post, post => post?.title || '');

export const $mode = restore(setMode, 'LOADING');
