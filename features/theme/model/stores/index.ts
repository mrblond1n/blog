import {restore} from 'effector'
import {setTheme} from 'features/theme/model/events'
import {lightTheme} from 'features/theme/utils/getTheme'

export const $appTheme = restore(setTheme, lightTheme)
