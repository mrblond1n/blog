import {sample} from 'effector';
import {createGate} from 'effector-react';
import {setTheme} from 'features/theme/model/events';
import {getTheme} from 'features/theme/utils/getTheme';

export const Gate = createGate();

export type TTheme = 'dark' | 'light';

sample({
    clock: Gate.open,
    fn: () => getTheme((localStorage.getItem('theme') || 'dark') as TTheme),
    target: setTheme,
});
