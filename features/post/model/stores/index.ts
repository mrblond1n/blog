import {combine, restore} from 'effector';
import {getPostFx} from 'features/post/model/effects';
import {setMode} from 'features/post/model/events';
import {Gate} from 'features/post/model';

const $post = restore(getPostFx.doneData, null).reset(Gate.close);

export const $body = combine($post, post => post?.text || '');
export const $title = combine($post, post => post?.title || '');

export const $mode = restore(setMode, 'LOADING');
