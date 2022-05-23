import {ROUTES} from 'routes';

export const INTL = {
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
    SIGN_IN: {
        SUBMIT: 'Sign in',
        TO: "Didn't have account? Let's sign up",
    },
    SIGN_OUT: 'Sign out',
    SIGN_UP: {
        SUBMIT: 'Sign in',
        TO: "Already have account? Let's sign in",
    },
};
