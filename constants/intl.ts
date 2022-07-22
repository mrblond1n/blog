import {ROUTES} from 'routes';

export const INTL = {
    COMMENT: {
        ACTION: {
            HIDE_REPLIES: 'Hide replies',
            REPLY: 'REPLY',
            SEND: 'Send',
            SHOW_REPLIES: (replies: number) => `View ${replies} replies`,
        },
        MENU: {
            ACTION: {
                CLOSE: 'close',
                REMOVE: 'remove',
            },
        },
        PLACEHOLDER: {
            COMMENT: 'Comment',
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
    ERROR: {
        NOT_FOUND_PAGE: {
            TITLE: '404',
            TEXT: 'This page could not be found.',
        },
    },
};
