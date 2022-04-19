import {restore} from 'effector';
import {setCurrentLinks} from 'features/navigation/model/events';
import {ROUTES} from 'routes';

export const authorizedLinks = [ROUTES.HOME, ROUTES.POSTS];
export const unauthorizedLinks = [ROUTES.HOME, ROUTES.POSTS, ROUTES.AUTH];

export const $links = restore(setCurrentLinks, unauthorizedLinks);
