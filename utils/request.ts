import db from 'config';
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs} from 'firebase/firestore';

export type TInterceptor = (data: any) => any;

export const defaultInterceptor: TInterceptor = (response: any): any => {
    if (response) return response;

    throw new Error('bad request');
};

export type TRequestConfig = {
    collection: 'posts';
    id?: string;
    data?: any;
    type: 'ADD' | 'GET' | 'GET_LIST' | 'REMOVE';
};

export const createFirebaseRequest = ({collection, id, data, type}: TRequestConfig) => ({collection, id, data, type});

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
            const querySnapshot = await addDoc(collection(db, config.collection), config.data);

            response = {...config.data, id: querySnapshot.id};
            break;
        }
        case 'GET': {
            if (!config.id) break;
            const querySnapshot = await getDoc(doc(db, config.collection, config.id));

            response = {...querySnapshot.data(), id: config.id};
            break;
        }
        case 'GET_LIST': {
            const querySnapshot = await getDocs(collection(db, config.collection));

            response = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
            break;
        }
        case 'REMOVE': {
            if (!config.id) break;
            await deleteDoc(doc(db, config.collection, config.id));
            response = config.id;
            break;
        }
    }

    return interceptorToUse(response);
};
