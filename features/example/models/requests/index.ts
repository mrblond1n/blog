import {TExampleItemDto} from 'types/dtos/example.dto'
import {createFirestoreRequest} from 'utils/requests/requestFirestore'

export const addExampleItemsRequest = (item: TExampleItemDto) => createFirestoreRequest('ADD', 'example', item)
export const getExampleItemsRequest = () => createFirestoreRequest('GET_LIST', 'example', {order: ['value', 'desc']})
export const removeExampleItemsRequest = (item: TExampleItemDto) => createFirestoreRequest('REMOVE', 'example', item.id)
