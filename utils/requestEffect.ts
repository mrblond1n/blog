import {createEffect, Effect} from 'effector';
import {firebaseAuthRequest, TFirebaseAuthRequestConfig} from 'utils/requestAuth';
import {storageRequest, TStorageRequestConfig} from 'utils/requestStorage';
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

type TFirebaseAuthEffectParams<Codec, Params> = {
    codec: Codec;
    request: (params: Params) => TFirebaseAuthRequestConfig;
    interceptor?: (data: unknown) => unknown;
};

export const createFirebaseAuthEffect = <Params, Codec extends t.Any>({
    codec,
    request,
    interceptor,
}: TFirebaseAuthEffectParams<Codec, Params>): Effect<Params, t.TypeOf<Codec>> => {
    return createEffect(async (params: Params) =>
        t.decode(codec, await firebaseAuthRequest(request(params), interceptor))
    );
};

type TStorageEffectParams<Codec, Params> = {
    codec: Codec;
    request: (params: Params) => TStorageRequestConfig;
    interceptor?: (data: unknown) => unknown;
};

export const createStorageEffect = <Params, Codec extends t.Any>({
    codec,
    request,
    interceptor,
}: TStorageEffectParams<Codec, Params>): Effect<Params, t.TypeOf<Codec>> => {
    return createEffect(async (params: Params) => t.decode(codec, await storageRequest(request(params), interceptor)));
};
