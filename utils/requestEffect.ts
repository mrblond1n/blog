import {createEffect, Effect} from 'effector';
import {firebaseRequest, TRequestConfig} from './request';
import * as t from './validation';

type TFirebaseEffectParams<Codec, Params> = {
    codec: Codec;
    request: (params: Params) => TRequestConfig;
    interceptor?: (data: unknown) => unknown;
};

export const createFirebaseEffect = <Params, Codec extends t.Any>({
    codec,
    request,
    interceptor,
}: TFirebaseEffectParams<Codec, Params>): Effect<Params, t.TypeOf<Codec>> => {
    return createEffect(async (params: Params) => t.decode(codec, await firebaseRequest(request(params), interceptor)));
};
