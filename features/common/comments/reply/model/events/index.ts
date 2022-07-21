import {createEvent} from 'effector';
import React from 'react';
import {TCommentDto} from 'types/dtos/comments.dto';

export const closeOpened = createEvent<string>();
export const clearReply = createEvent<string>();

export const onChange = createEvent<React.ChangeEvent<HTMLFormElement>>();
export const onToggle = createEvent<string>();
export const onKeyDown = createEvent<React.KeyboardEvent<HTMLFormElement>>();
export const onOpen = createEvent<string>();
export const onReply = createEvent<string>();
export const onSend = createEvent<void>();

export const addReply = createEvent<TCommentDto>();
export const changeValue = createEvent<{key: string; value: string}>();
export const getReplies = createEvent<string>();
export const hideReplies = createEvent<void>();
export const sendReply = createEvent<{text: string; discussion_id: string; reply_id: string}>();
export const setDiscussionId = createEvent<string>();
export const showReplies = createEvent<void>();
