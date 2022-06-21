import {restore} from 'effector';
import {setTheme} from 'features/common/theme/model/events';
import {lightTheme} from 'features/common/theme/utils/getTheme';

export const $appTheme = restore(setTheme, lightTheme);
