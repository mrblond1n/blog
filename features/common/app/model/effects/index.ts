import {checkAuthRequest, getUserRequest} from 'features/common/app/model/requests';
import {UserCodec} from 'types/dtos/user.dto';
import {createFirebaseAuthEffect, createFirebaseEffect} from 'utils/requestEffect';

export const checkAuthFx = createFirebaseAuthEffect({
    codec: UserCodec,
    request: checkAuthRequest,
});

export const getUserFx = createFirebaseEffect({
    codec: UserCodec,
    request: getUserRequest,
});
