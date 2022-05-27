import {FieldPath, orderBy, OrderByDirection, setDoc} from '@firebase/firestore';
import db from 'config';
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where, WhereFilterOp} from 'firebase/firestore';

export type TInterceptor = (data: any) => any;

export const defaultInterceptor: TInterceptor = (response: any): any => {
    if (response) return response;

    throw new Error('bad request');
};

export type TRequestConfig = {
    collection: 'posts' | `posts/${string}/comments`;
    condition?: [fieldPath: string | FieldPath, opString: WhereFilterOp, value: unknown];
    data?: any;
    id?: string;
    order?: [fieldPath: string | FieldPath, directionStr: OrderByDirection];
    type: 'ADD' | 'GET' | 'GET_LIST' | 'REMOVE' | 'SET';
};

export const createFirebaseRequest = (props: TRequestConfig) => props;

export type TResponse<Result> = {
    response: Response;
    data: Result & {
        status_code: number;
    };
};

export const firebaseRequest = async <Result>(
    config: TRequestConfig,
    interceptor?: TInterceptor
): Promise<TResponse<Result>> => {
    const interceptorToUse = interceptor || defaultInterceptor;
    let response;

    switch (config.type) {
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
            if (!config.id) break;
            const querySnapshot = await getDoc(doc(db, config.collection, config.id));

            response = {...querySnapshot.data(), id: config.id};
            break;
        }
        case 'GET_LIST': {
            const order = config.order ? orderBy(...config.order) : orderBy('created_at', 'desc');
            let neededData = query(collection(db, config.collection), order);

            if (config.condition) {
                neededData = query(collection(db, config.collection), where(...config.condition), order);
            }

            const querySnapshot = await getDocs(neededData);

            response = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
            break;
        }
        case 'REMOVE': {
            if (!config.id) break;
            await deleteDoc(doc(db, config.collection, config.id));
            response = config.id;
            break;
        }
        case 'SET': {
            if (!config.id) break;
            await setDoc(doc(db, config.collection, config.id), config.data);

            response = config.data;
            break;
        }
    }

    return interceptorToUse(response);
};
