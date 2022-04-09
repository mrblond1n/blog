export const ROUTES = {
    HOME: '/',
    POSTS: '/posts',
    AUTH: '/auth',
} as const;

const routesList = Object.values(ROUTES);

export type TDeepRoutes = `/posts/${string}`;
export type TRoutes = typeof routesList[number];
