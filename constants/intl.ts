import {ROUTES} from 'routes';

export const INTL = {
    AUTH: {
        SIGN_OUT: 'Sign out',
        NOT: {
            SIGN_IN: "Didn't have account? Let's sign up",
            SIGN_UP: "Already have account? Let's sign in",
        },
    },
    SIGN_IN: {
        SUBMIT: 'Sign in',
        TO: "Didn't have account? Let's sign up",
    },
    SIGN_UP: {
        SUBMIT: 'Sign in',
        TO: "Already have account? Let's sign in",
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
        CREATE: 'Create',
        OPEN: 'Open',
        REMOVE: 'Remove',
        UPDATE: 'Update posts',
    },
};
