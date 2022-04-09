import {createStore} from 'effector';
import {ROUTES} from 'routes';

export const $links = createStore([ROUTES.HOME, ROUTES.POSTS, ROUTES.AUTH]);
