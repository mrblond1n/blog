import {QueryDocumentSnapshot} from '@firebase/firestore';
import {createStore} from 'effector';
import {resetPaginationIndexes, setLastItem} from 'features/firebase/pagination/models/events';
import {createIndex} from 'utils/stack';

export const $paginationIndex = createStore(createIndex<QueryDocumentSnapshot>())
    .on(setLastItem, (index, {key, value}) => index.set({key, value}))
    .on(resetPaginationIndexes, index => index.clear())
    .map(value => value.getRaw());
