import {createEvent} from 'effector';
import React from 'react';
import {TData} from 'types';
import {TCommentDto} from 'types/dtos/comments.dto';

export const closeOpened = createEvent<string>();
export const onToggle = createEvent<string>();
export const onOpen = createEvent<string>();
export const onReply = createEvent<string>();
export const onSend = createEvent<React.FormEvent>();

export const addReply = createEvent<TCommentDto>();
export const getReplies = createEvent<string>();
export const hideReplies = createEvent<void>();
export const sendReply = createEvent<TData>();
export const setDiscussionId = createEvent<string>();
export const showReplies = createEvent<void>();
