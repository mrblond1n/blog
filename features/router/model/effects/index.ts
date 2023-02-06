import {createEffect} from 'effector'
import Router from 'next/router'

export const toPageFx = createEffect((url?: string) => url && Router.push(url))
