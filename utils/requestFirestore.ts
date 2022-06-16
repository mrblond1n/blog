import {FieldPath, orderBy, OrderByDirection, setDoc} from '@firebase/firestore';
import db from 'config';
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where, WhereFilterOp} from 'firebase/firestore';
import {defaultInterceptor, TInterceptor, TResponse} from 'utils/request';
import {TOverloadedReturnType} from 'utils/typescript/overload';

type TCollection = 'posts' | `posts/${string}/comments` | 'users';
type TOptions = {
    condition?: [fieldPath: string | FieldPath, opString: WhereFilterOp, value: unknown];
    order?: [fieldPath: string | FieldPath, directionStr: OrderByDirection];
};

type TConfig<T, C, D = void, I = void, O = void> = {collection: C; data: D; id: I; options: O; type: T};

export function createFirestoreRequest(
    type: 'GET_LIST',
    collection: TCollection,
    options?: TOptions
): TConfig<typeof type, typeof collection, void, void, typeof options>;

export function createFirestoreRequest(
    type: 'ADD',
    collection: TCollection,
    data: any
): TConfig<typeof type, typeof collection, any>;

export function createFirestoreRequest(
    type: 'SET',
    collection: TCollection,
    data: any,
    id: string
): TConfig<typeof type, typeof collection, any, string>;

export function createFirestoreRequest(
    type: 'GET' | 'REMOVE',
    collection: TCollection,
    id: string
): TConfig<typeof type, typeof collection, void, string>;

export function createFirestoreRequest(type: string, collection: string, data?: any, id?: any, options?: any) {
    if (type === 'GET_LIST') return {type, collection, options: data};
    if (!id && typeof data === 'string') return {type, collection, data, id: data, options};

    return {type, collection, data, id, options};
}

export type TFirestoreRequestConfig = TOverloadedReturnType<typeof createFirestoreRequest>;

export const firestoreRequest = async <Result>(
    config: TFirestoreRequestConfig,
    interceptor?: TInterceptor
): Promise<TResponse<Result>> => {
    const interceptorToUse = interceptor || defaultInterceptor;
    let response;

    const {type, id, options} = config;

    if (type === 'ADD') {
        const data = {
            ...config.data,
            created_at: new Date().getTime(),
        };

        const querySnapshot = await addDoc(collection(db, config.collection), data);

        response = {...data, id: querySnapshot.id};
    } else if (type === 'GET') {
        const querySnapshot = await getDoc(doc(db, config.collection, id));

        response = {...querySnapshot.data(), id};
    } else if (type === 'GET_LIST') {
        const order = options?.order ? orderBy(...options.order) : orderBy('created_at', 'asc');
        let neededData = query(collection(db, config.collection), order);

        if (options?.condition) {
            neededData = query(collection(db, config.collection), where(...options.condition), order);
        }

        const querySnapshot = await getDocs(neededData);

        response = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
    } else if (type === 'REMOVE') {
        await deleteDoc(doc(db, config.collection, id));

        response = config.id;
    } else if (type === 'SET') {
        await setDoc(doc(db, config.collection, id), config.data);

        response = config.data;
    }

    return interceptorToUse(response);
};
