import {createEvent} from 'effector';
import {TExampleItemDto} from 'types/dtos/example.dto';

export const addExampleItem = createEvent<TExampleItemDto>();
export const removeExampleItem = createEvent<TExampleItemDto>();
export const clearExampleIndex = createEvent<void>();

export const getExampleItems = createEvent<void>();
