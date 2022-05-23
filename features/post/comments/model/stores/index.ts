import {restore} from 'effector';
import {setMode} from 'features/post/comments/model/events';

export const $mode = restore(setMode, 'LOADING');
