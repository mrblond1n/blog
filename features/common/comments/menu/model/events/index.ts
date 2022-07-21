import {createEvent} from 'effector';

export const openMenu = createEvent<string>();
export const closeMenu = createEvent<string>();
export const resetMenus = createEvent<void>();

export const onOpen = createEvent<string>();
export const onClose = createEvent<string>();
export const onRemove = createEvent<string>();
