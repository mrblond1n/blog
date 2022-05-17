export const ROUTES = {
    HOME: '/',
    POSTS: '/posts',
    SIGN_IN: '/signin',
    SIGN_UP: '/signup',
    AUTH: '/signin',
} as const;

const routesList = Object.values(ROUTES);

export type TDeepRoutes = `/posts/${string}`;
export type TRoutes = typeof routesList[number];
