import {checkAuthRequest} from 'features/app/model/requests';
import {UserCodec} from 'types/dtos/user.dto';
import {createFirebaseAuthEffect} from 'utils/requestEffect';

export const checkAuthFx = createFirebaseAuthEffect({
    codec: UserCodec,
    request: checkAuthRequest,
});
