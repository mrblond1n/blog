import {signInRequest, signOutRequest} from 'features/signin/model/requests';
import {UserCodec} from 'types/dtos/user.dto';
import {createFirebaseAuthEffect} from 'utils/requestEffect';
import {t} from 'utils/validation';

export const signInFx = createFirebaseAuthEffect({
    codec: UserCodec,
    request: signInRequest,
});

export const signOutFx = createFirebaseAuthEffect({
    codec: t.boolean,
    request: signOutRequest,
});
