import {createEffect, Effect} from 'effector';
import {authRequest, TAuthRequestConfig} from 'utils/requests/requestAuth';
import {storageRequest, TStorageRequestConfig} from 'utils/requests/requestStorage';
import {firestoreRequest, TFirestoreRequestConfig} from 'utils/requests/requestFirestore';
import * as t from 'utils/validation';

type TFirebaseEffectParams<Codec, Params> = {
    codec: Codec;
    request: (params: Params) => TFirestoreRequestConfig;
    interceptor?: (data: unknown) => unknown;
};

export const createFirebaseEffect = <Params, Codec extends t.Any>({
    codec,
    request,
    interceptor,
}: TFirebaseEffectParams<Codec, Params>): Effect<Params, t.TypeOf<Codec>> =>
    createEffect(async (params: Params) => t.decode(codec, await firestoreRequest(request(params), interceptor)));

type TFirebaseAuthEffectParams<Codec, Params> = {
    codec: Codec;
    request: (params: Params) => TAuthRequestConfig;
    interceptor?: (data: unknown) => unknown;
};

export const createAuthEffect = <Params, Codec extends t.Any>({
    codec,
    request,
    interceptor,
}: TFirebaseAuthEffectParams<Codec, Params>): Effect<Params, t.TypeOf<Codec>> =>
    createEffect(async (params: Params) => t.decode(codec, await authRequest(request(params), interceptor)));

type TStorageEffectParams<Codec, Params> = {
    codec: Codec;
    request: (params: Params) => TStorageRequestConfig;
    interceptor?: (data: unknown) => unknown;
};

export const createStorageEffect = <Params, Codec extends t.Any>({
    codec,
    request,
    interceptor,
}: TStorageEffectParams<Codec, Params>): Effect<Params, t.TypeOf<Codec>> =>
    createEffect(async (params: Params) => t.decode(codec, await storageRequest(request(params), interceptor)));
