import {signInRequest, signUpRequest} from 'features/auth/model/requests';
import {UserCodec} from 'types/dtos/user.dto';
import {createFirebaseAuthEffect} from 'utils/requestEffect';

export const signInFx = createFirebaseAuthEffect({
    codec: UserCodec,
    request: signInRequest,
});

export const signUpFx = createFirebaseAuthEffect({
    codec: UserCodec,
    request: signUpRequest,
});
