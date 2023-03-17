import {createApi, createStore} from 'effector'
import {ROUTES} from 'routes'

export const authorizedLinks = [ROUTES.HOME]
export const unauthorizedLinks = [ROUTES.HOME, ROUTES.SIGN_IN]

export const $links = createStore<typeof authorizedLinks | typeof unauthorizedLinks>(unauthorizedLinks)

export const setLinks = createApi($links, {
  authorize: () => authorizedLinks,
  unAuthorize: () => unauthorizedLinks,
})
