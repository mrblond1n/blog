import {FieldPath, limit, orderBy, OrderByDirection, setDoc, updateDoc} from '@firebase/firestore';
import db from 'config';
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where, WhereFilterOp} from 'firebase/firestore';
import {defaultInterceptor, TInterceptor, TResponse} from 'utils/requests';
import {TOverloadedReturnType} from 'utils/typescript/overload';

type TCollection =
    | 'example'
    | 'posts'
    | `posts/${string}/comments`
    | `posts/${string}/comments/${string}/comments`
    | 'users';
type TOptions = {
    condition?: [fieldPath: string | FieldPath, opString: WhereFilterOp, value: unknown];
    limit?: number;
    order?: [fieldPath: string | FieldPath, directionStr: OrderByDirection];
};

type TType = 'GET_LIST' | 'ADD' | 'SET' | 'GET' | 'REMOVE' | 'UPDATE';
type TData = {[key: string]: any};
type TConfig = {collection: TCollection; data: TData; options: TOptions; id: string};
type TConfigType<K extends keyof TConfig, T extends TType> = Pick<TConfig, K> & {type: T};

export function createFirestoreRequest(
    type: 'GET_LIST',
    collection: TCollection,
    options?: TOptions
): TConfigType<'collection' | 'options', typeof type>;

export function createFirestoreRequest(
    type: 'ADD',
    collection: TCollection,
    data: TData
): TConfigType<'collection' | 'data', typeof type>;

export function createFirestoreRequest(
    type: 'GET' | 'REMOVE',
    collection: TCollection,
    id: string
): TConfigType<'collection' | 'id', typeof type>;

export function createFirestoreRequest(
    type: 'UPDATE' | 'SET',
    collection: TCollection,
    data: TData,
    id: string
): TConfigType<'collection' | 'data' | 'id', typeof type>;

export function createFirestoreRequest(
    type: TType,
    collection: TCollection,
    data?: TData | string | TOptions,
    id?: string
) {
    switch (type) {
        case 'GET_LIST':
            return {collection, options: data, type};
        case 'ADD':
            return {collection, data, type};
        case 'SET':
        case 'UPDATE':
            return {collection, id, data, type};
        case 'GET':
        case 'REMOVE':
            return {collection, id: data, type};
    }
}

export type TFirestoreRequestConfig = TOverloadedReturnType<typeof createFirestoreRequest>;

export const firestoreRequest = async <Result>(
    config: TFirestoreRequestConfig,
    interceptor?: TInterceptor
): Promise<TResponse<Result>> => {
    const interceptorToUse = interceptor || defaultInterceptor;
    let response;

    const {type} = config;

    switch (type) {
        case 'ADD': {
            const data = {
                ...config.data,
                created_at: new Date().getTime(),
            };

            const querySnapshot = await addDoc(collection(db, config.collection), data);

            response = {...data, id: querySnapshot.id};
            break;
        }

        case 'GET': {
            const querySnapshot = await getDoc(doc(db, config.collection, config.id));

            response = {...querySnapshot.data(), id: config.id};
            break;
        }

        case 'GET_LIST': {
            const {options} = config;

            const params = [
                collection(db, config.collection),
                options?.condition ? where(...options.condition) : where('created_at', '!=', ''),
                options?.limit ? limit(options.limit) : limit(25),
                options?.order ? orderBy(...options.order) : orderBy('created_at', 'asc'),
            ] as const;

            const querySnapshot = await getDocs(query(...params));

            response = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
            break;
        }

        case 'REMOVE': {
            await deleteDoc(doc(db, config.collection, config.id));

            response = config.id;
            break;
        }

        case 'SET': {
            await setDoc(doc(db, config.collection, config.id), config.data);

            response = config.data;
            break;
        }

        case 'UPDATE': {
            await updateDoc(doc(db, config.collection, config.id), config.data);

            response = true;
            break;
        }
    }

    return interceptorToUse(response);
};
