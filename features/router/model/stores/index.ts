import {createApi, createStore} from 'effector'
import {ROUTES} from 'routes'

export const authorizedLinks = [ROUTES.HOME, ROUTES.POSTS]
export const unauthorizedLinks = [ROUTES.HOME, ROUTES.POSTS, ROUTES.SIGN_IN]

export const $links = createStore<typeof authorizedLinks | typeof unauthorizedLinks>(unauthorizedLinks)

export const setLinks = createApi($links, {
  authorize: () => authorizedLinks,
  unAuthorize: () => unauthorizedLinks,
})
