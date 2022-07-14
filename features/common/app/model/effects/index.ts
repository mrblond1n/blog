import {checkAuthRequest, getUserRequest} from 'features/common/app/model/requests';
import {UserCodec} from 'types/dtos/user.dto';
import {createAuthEffect, createFirebaseEffect} from 'utils/requests/requestEffect';

export const checkAuthFx = createAuthEffect({
    codec: UserCodec,
    request: checkAuthRequest,
});

export const getUserFx = createFirebaseEffect({
    codec: UserCodec,
    request: getUserRequest,
});
