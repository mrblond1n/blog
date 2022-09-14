import {createStore, restore} from 'effector';
import {clearNotification, setNotify, setNotifyMode, setNotifyState} from 'features/notifications/model/events';

type TNotify = {
    text?: string;
    title: string;
};

export const $notify = createStore<TNotify>({title: ''})
    .on(setNotify, (_, value) => ({...value}))
    .reset(clearNotification);

export type TNotifyState = 'OPENED' | 'CLOSED';
export const $notifyState = restore(setNotifyState, 'CLOSED');
export type TNotifyMode = 'success' | 'warning';
export const $notifyMode = restore(setNotifyMode, 'warning');
