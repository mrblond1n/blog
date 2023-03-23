import {createStore} from 'effector'
import {closeModal, openModal, resetModals, setModal} from 'features/common/modal/models/events'
import {createIndex} from 'utils/stack'

export const $openIndex = createStore(createIndex<boolean>())
  .on(openModal, (index, key) => index.set({key, value: true}))
  .on(closeModal, (index, key) => index.set({key, value: false}))
  .reset(resetModals)
  .map(value => value.getRaw())

export const $modalIndex = createStore(createIndex<{title: string}>())
  .on(setModal, (index, {id, ...payload}) => index.set({key: id, value: payload}))
  .map(value => value.getRaw())
