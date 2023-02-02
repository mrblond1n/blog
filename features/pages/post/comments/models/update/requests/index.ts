import {TData} from 'types';
import {createFirestoreRequest} from 'utils/requests/requestFirestore';

type TProps = TData & {path: string; id: string};
export const updateCommentLikesRequest = ({path, ...data}: TProps) => {
    return createFirestoreRequest('UPDATE', `posts/${path}/comments`, data, data.id);
};

export const updateCommentRepliesRequest = ({path, ...data}: TProps) => {
    return createFirestoreRequest('UPDATE', `posts/${path}/comments`, data, data.id);
};
