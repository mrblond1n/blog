import {createUserWithEmailAndPassword, signOut} from '@firebase/auth';
import {FieldPath} from '@firebase/firestore';
import db, {auth, getCurrentUser} from 'config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where, WhereFilterOp} from 'firebase/firestore';

export type TInterceptor = (data: any) => any;

export const defaultInterceptor: TInterceptor = (response: any): any => {
    if (response) return response;

    throw new Error('bad request');
};

export type TRequestConfig = {
    collection: 'posts';
    condition?: [fieldPath: string | FieldPath, opString: WhereFilterOp, value: unknown];
    id?: string;
    data?: any;
    type: 'ADD' | 'GET' | 'GET_LIST' | 'REMOVE';
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
            let neededData = query(collection(db, config.collection));

            if (config.condition) {
                neededData = query(collection(db, config.collection), where(...config.condition));
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
    }

    return interceptorToUse(response);
};

export type TFirebaseAuthRequestConfig = {
    data?: any;
    type: 'CHECK' | 'SIGN_IN' | 'SIGN_OUT' | 'SIGN_UP';
};

export const createFirebaseAuthRequest = ({type, data}: TFirebaseAuthRequestConfig) => ({type, data});

export const firebaseAuthRequest = async <Result>(
    config: TFirebaseAuthRequestConfig,
    interceptor?: TInterceptor
): Promise<TResponse<Result>> => {
    const interceptorToUse = interceptor || defaultInterceptor;
    let response;

    switch (config.type) {
        case 'CHECK': {
            response = await getCurrentUser(auth);

            break;
        }
        case 'SIGN_IN': {
            const data = await signInWithEmailAndPassword(auth, config.data.email, config.data.password);

            response = data.user;
            break;
        }
        case 'SIGN_OUT': {
            await signOut(auth);
            response = true;

            break;
        }

        case 'SIGN_UP': {
            const data = await createUserWithEmailAndPassword(auth, config.data.email, config.data.password);

            response = data.user;
            break;
        }
    }

    return interceptorToUse(response);
};
