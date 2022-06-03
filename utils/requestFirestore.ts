import {FieldPath, orderBy, OrderByDirection, setDoc} from '@firebase/firestore';
import db from 'config';
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where, WhereFilterOp} from 'firebase/firestore';
import {defaultInterceptor, TInterceptor, TResponse} from 'utils/request';

export type TFirestoreRequestConfig = {
    collection: 'posts' | `posts/${string}/comments`;
    condition?: [fieldPath: string | FieldPath, opString: WhereFilterOp, value: unknown];
    data?: any;
    id?: string;
    order?: [fieldPath: string | FieldPath, directionStr: OrderByDirection];
    type: 'ADD' | 'GET' | 'GET_LIST' | 'REMOVE' | 'SET';
};

export const createFirestoreRequest = (props: TFirestoreRequestConfig) => props;

export const firestoreRequest = async <Result>(
    config: TFirestoreRequestConfig,
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
