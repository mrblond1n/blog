import {signInRequest, signOutRequest} from 'features/signin/model/requests';
import {UserCodec} from 'types/dtos/user.dto';
import {createAuthEffect} from 'utils/requests/requestEffect';
import {t} from 'utils/validation';

export const signInFx = createAuthEffect({
    codec: UserCodec,
    request: signInRequest,
});

export const signOutFx = createAuthEffect({
    codec: t.boolean,
    request: signOutRequest,
});
