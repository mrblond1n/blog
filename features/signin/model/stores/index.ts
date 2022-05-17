import {restore} from 'effector';
import {setState} from 'features/signin/model/events';

export const $state = restore(setState, 'SIGN_IN');
