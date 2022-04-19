import {createEvent} from 'effector';
import {authorizedLinks, unauthorizedLinks} from 'features/navigation/model/stores';
import {TRoutes} from 'routes';

export const toPage = createEvent<TRoutes>();
export const setCurrentLinks = createEvent<typeof authorizedLinks | typeof unauthorizedLinks>();

export const toMain = createEvent<void>();
