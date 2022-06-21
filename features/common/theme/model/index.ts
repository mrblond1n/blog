import {sample} from 'effector';
import {createGate} from 'effector-react';
import {setTheme} from 'features/common/theme/model/events';
import {getTheme} from 'features/common/theme/utils/getTheme';

export const Gate = createGate();

export type TTheme = 'dark' | 'light';

sample({
    clock: Gate.open,
    fn: () => getTheme((localStorage.getItem('theme') as TTheme) || 'light'),
    target: setTheme,
});
