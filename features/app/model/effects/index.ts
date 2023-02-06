import {checkAuthRequest, getUserRequest} from 'features/app/model/requests'
import {CheckUserCodec, UserCodec} from 'types/dtos/user.dto'
import {createAuthEffect, createFirebaseEffect} from 'utils/requests/requestEffect'

export const checkAuthFx = createAuthEffect({
  codec: CheckUserCodec,
  request: checkAuthRequest,
  interceptor: data => data,
})

export const getUserFx = createFirebaseEffect({
  codec: UserCodec,
  request: getUserRequest,
})
