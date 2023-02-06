import {ROUTES} from 'routes'

export const INTL = {
  APP: {
    HEADER: {
      THEME_BUTTON: 'Theme switcher',
    },
  },
  COMMENT: {
    ACTION: {
      HIDE_REPLIES: 'Hide replies',
      REPLY: 'REPLY',
      SEND: 'Send',
      SHOW_REPLIES: 'View more replies',
    },
    MENU: {
      ACTION: {
        CLOSE: 'close',
        REMOVE: 'remove',
      },
    },
    PLACEHOLDER: 'Write your comment',
  },
  ERROR: {
    NOT_FOUND_PAGE: {
      TITLE: '404',
      TEXT: 'This page could not be found.',
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
    LOAD_MORE: 'Load more',
    NOT_FOUND: 'Posts not found',
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
  WELCOME: {
    UNAUTHORIZED_USER: 'To fully try all the features of the service, please log in',
  },
}
