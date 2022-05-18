import {createEffect} from 'effector';

export const onResetFx = createEffect((elem: HTMLFormElement) => elem.reset());
