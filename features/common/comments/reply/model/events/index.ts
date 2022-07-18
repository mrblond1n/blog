import {createEvent} from 'effector';
import React from 'react';

export const clearOpenedIndex = createEvent<void>();
export const clearReplyValue = createEvent<string>();

export const onKeyDown = createEvent<React.KeyboardEvent<HTMLFormElement>>();
export const onOpen = createEvent<string>();
export const onChange = createEvent<React.ChangeEvent<HTMLFormElement>>();
export const changeValue = createEvent<{key: string; value: string}>();

export const onReply = createEvent<string>();
export const onSend = createEvent<void>();
export const sendReply = createEvent<{text: string; discussion_id: string; reply_id: string}>();
