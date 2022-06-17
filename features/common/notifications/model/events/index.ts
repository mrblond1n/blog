import {createEvent} from 'effector';
import {TNotifyMode, TNotifyState} from 'features/common/notifications/model/stores';

export const clearNotification = createEvent<void>();

export const setNotify = createEvent<{text?: string; title: string}>();
export const setNotifyMode = createEvent<TNotifyMode>();
export const setNotifyState = createEvent<TNotifyState>();
