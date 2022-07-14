import {createEvent} from 'effector';
import React from 'react';
import {TCommentDto} from 'types/dtos/comments.dto';

export const addComment = createEvent<TCommentDto>();
export const sendComment = createEvent<string>();

type TMode = 'LOADING' | 'FAILURE' | 'SUCCESS';
export const setMode = createEvent<TMode>();

export const onAnswer = createEvent<string>();
export const setParentId = createEvent<string>();
export const openAnswerField = createEvent<string>();
export const clearAnswerStack = createEvent<void>();

export const onKeyDown = createEvent<React.KeyboardEvent<HTMLFormElement>>();
export const onChange = createEvent<React.ChangeEvent<HTMLFormElement>>();
export const changeAnswerText = createEvent<{key: string; value: string}>();
