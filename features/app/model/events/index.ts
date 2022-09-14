import {createEvent} from 'effector';
import {TUserDto} from 'types/dtos/user.dto';

export const setUser = createEvent<TUserDto>();
