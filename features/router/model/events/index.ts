import {createEvent} from 'effector'
import {TRoutes} from 'routes'

export const toPage = createEvent<TRoutes>()

export const toMain = createEvent<void>()
