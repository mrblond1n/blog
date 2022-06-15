import {createUserRequest, signUpRequest} from 'features/signup/model/requests';
import {UserCodec} from 'types/dtos/user.dto';
import {createFirebaseAuthEffect, createFirebaseEffect} from 'utils/requestEffect';

export const signUpFx = createFirebaseAuthEffect({
    codec: UserCodec,
    request: signUpRequest,
});

export const createUserFx = createFirebaseEffect({
    codec: UserCodec,
    request: createUserRequest,
});
