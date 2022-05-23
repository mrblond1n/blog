import {createEvent} from 'effector';
import {TUserDto} from 'types/dtos/user.dto';

type TAppState = 'INITIAL_LOADING' | 'AUTHORIZED' | 'UNAUTHORIZED';
export const setAppState = createEvent<TAppState>();

export const setUser = createEvent<TUserDto>();
