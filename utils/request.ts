import {createUserWithEmailAndPassword, signOut, updateProfile} from '@firebase/auth';
import {FieldPath, orderBy, OrderByDirection} from '@firebase/firestore';
import db, {auth, getCurrentUser} from 'config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where, WhereFilterOp} from 'firebase/firestore';

export type TInterceptor = (data: any) => any;

export const defaultInterceptor: TInterceptor = (response: any): any => {
    if (response) return response;

    throw new Error('bad request');
};

export type TRequestConfig = {
    collection: 'posts' | 'comments';
    condition?: [fieldPath: string | FieldPath, opString: WhereFilterOp, value: unknown];
    data?: any;
    id?: string;
    order?: [fieldPath: string | FieldPath, directionStr: OrderByDirection];
    type: 'ADD' | 'GET' | 'GET_LIST' | 'REMOVE' | 'REMOVE_LIST';
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
    const {data, type} = config;

    switch (type) {
        case 'CHECK': {
            response = await getCurrentUser(auth);

            break;
        }
        case 'SIGN_IN': {
            const credential = await signInWithEmailAndPassword(auth, data.email, data.password);

            response = credential.user;
            break;
        }
        case 'SIGN_OUT': {
            await signOut(auth);
            response = true;

            break;
        }

        case 'SIGN_UP': {
            const displayName = data.displayName;
            const credential = await createUserWithEmailAndPassword(auth, data.email, data.password).then(userCrd => {
                updateProfile(userCrd.user, {displayName});

                return userCrd;
            });

            response = {...credential.user, displayName};
            break;
        }
    }

    return interceptorToUse(response);
};
