import * as t from 'io-ts'
import {withFallback} from 'io-ts-types'

export const nullable = <C extends t.Any>(codec: C) => withFallback(t.union([codec, t.null]), null)
