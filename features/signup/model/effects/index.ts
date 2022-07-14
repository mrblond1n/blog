import {createUserRequest, signUpRequest} from 'features/signup/model/requests';
import {UserCodec} from 'types/dtos/user.dto';
import {createAuthEffect, createFirebaseEffect} from 'utils/requests/requestEffect';

export const signUpFx = createAuthEffect({
    codec: UserCodec,
    request: signUpRequest,
});

export const createUserFx = createFirebaseEffect({
    codec: UserCodec,
    request: createUserRequest,
});
