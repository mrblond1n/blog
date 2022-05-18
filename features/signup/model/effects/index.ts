import {signUpRequest} from 'features/signup/model/requests';
import {UserCodec} from 'types/dtos/user.dto';
import {createFirebaseAuthEffect} from 'utils/requestEffect';

export const signUpFx = createFirebaseAuthEffect({
    codec: UserCodec,
    request: signUpRequest,
});
