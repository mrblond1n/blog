import {
  addExampleItemsRequest,
  getExampleItemsRequest,
  removeExampleItemsRequest,
} from 'features/example/models/requests'
import {ExampleItemCodec, ExampleItemsCodec} from 'types/dtos/example.dto'
import {createFirebaseEffect} from 'utils/requests/requestEffect'

export const addExampleItemFx = createFirebaseEffect({
  codec: ExampleItemCodec,
  request: addExampleItemsRequest,
})

export const getExampleItemsFx = createFirebaseEffect({
  codec: ExampleItemsCodec,
  request: getExampleItemsRequest,
})

export const removeExampleItemFx = createFirebaseEffect({
  codec: ExampleItemCodec,
  request: removeExampleItemsRequest,
})
