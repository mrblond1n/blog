import {ROUTES} from 'routes';

export const INTL = {
    AUTH: {
        SIGN_IN: 'Sign in',
        SIGN_OUT: 'Sign out',
        SIGN_UP: 'Sign up',
        NOT: {
            SIGN_IN: "Didn't have account? Let's sign up",
            SIGN_UP: "Already have account? Let's sign in",
        },
    },
    HOME: {
        PATH: {
            [ROUTES.HOME]: 'Main',
            [ROUTES.POSTS]: 'Posts',
            [ROUTES.SIGN_IN]: 'Sign In',
            [ROUTES.SIGN_UP]: 'Sign Up',
        },
    },
    POSTS: {
        OPEN: 'Open',
        REMOVE: 'Remove',
        UPDATE: 'Update posts',
    },
};
