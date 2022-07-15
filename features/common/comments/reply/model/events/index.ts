import {createEvent} from 'effector';
import React from 'react';
import {TCommentDto} from 'types/dtos/comments.dto';

export const clearOpenedIndex = createEvent<void>();
export const clearReplyValue = createEvent<string>();
export const onReply = createEvent<string>();

export const onKeyDown = createEvent<React.KeyboardEvent<HTMLFormElement>>();
export const onOpen = createEvent<string>();
export const onChange = createEvent<React.ChangeEvent<HTMLFormElement>>();
export const changeValue = createEvent<{key: string; value: string}>();

export const sendReply = createEvent<Omit<TCommentDto, 'id' | 'created_at'>>();
