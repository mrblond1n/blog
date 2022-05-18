import {restore} from 'effector';
import {setCurrentLinks} from 'features/common/navigation/model/events';
import {ROUTES} from 'routes';

export const authorizedLinks = [ROUTES.HOME, ROUTES.POSTS];
export const unauthorizedLinks = [ROUTES.HOME, ROUTES.POSTS, ROUTES.SIGN_IN];

export const $links = restore(setCurrentLinks, unauthorizedLinks);
