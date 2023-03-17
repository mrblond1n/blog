import {forward, sample} from 'effector'
import {createGate} from 'effector-react'
import {$displayName, $uid} from 'features/app/model/stores'
import {addField, addFields, clearValues, onSubmit, resetForm} from 'features/common/form/model/events'
import {$valueIndex} from 'features/common/form/model/stores'
import {resetPaginationIndexes} from 'features/firebase/pagination/models/events'
import {addPostFx, getPostsFx, removePostFx, saveImageFx} from 'features/pages/posts/model/effects'
import {
  addNewPost,
  addPost,
  clearIndex,
  getPosts,
  onGetPosts,
  onRemove,
  removePost,
  resetDisable,
  setMode,
} from 'features/pages/posts/model/events'
import {$idsList, $mode} from 'features/pages/posts/model/stores'
import {fields} from 'features/pages/posts/utils/form'
import {iterate} from 'utils/effector/iterate'
import {getId} from 'utils/uniqueId'

export const Gate = createGate()

sample({
  clock: Gate.open,
  fn: () => fields,
  target: [getPosts, addFields],
})

forward({
  from: onGetPosts,
  to: getPostsFx,
})

forward({
  from: Gate.close,
  to: [resetForm, clearIndex, resetPaginationIndexes],
})

const newPostEvent = iterate(getPostsFx.doneData)
const newFieldEvent = iterate(addFields)

forward({
  from: newFieldEvent,
  to: addField,
})

forward({
  from: newPostEvent,
  to: addPost,
})

forward({
  from: getPosts,
  to: [getPostsFx, setMode.prepend(() => 'LOADING')],
})

sample({
  clock: onSubmit,
  source: $valueIndex,
  filter: Gate.status,
  fn: ({img}) => {
    const file = (typeof img === 'object' && !Array.isArray(img) ? img : null) as File | null

    if (!file) throw new Error('file not found')

    return {file, url: `${getId()}/${file.name}`}
  },
  target: saveImageFx,
})

sample({
  clock: saveImageFx.doneData,
  source: {author: $displayName, form: $valueIndex, uid: $uid},
  filter: Gate.status,
  fn: ({form, ...source}, img) => ({...source, ...form, img}),
  target: addPostFx,
})

sample({
  clock: addPostFx.doneData,
  target: addNewPost,
})

forward({
  from: addNewPost,
  to: clearValues,
})

forward({
  from: onRemove,
  to: removePostFx,
})

forward({
  from: removePostFx.doneData,
  to: removePost,
})

sample({
  clock: removePostFx.failData,
  source: removePostFx,
  target: resetDisable,
})

sample({
  clock: getPostsFx.doneData,
  filter: collection => !!collection.length,
  target: setMode.prepend(() => 'SUCCESS'),
})

sample({
  clock: getPostsFx.doneData,
  source: $idsList,
  filter: (ids, collection) => !ids.length && !collection.length,
  target: setMode.prepend(() => 'NOT_FOUND'),
})

sample({
  clock: addPostFx.doneData,
  source: $mode,
  filter: mode => mode === 'NOT_FOUND',
  target: setMode.prepend(() => 'SUCCESS'),
})

forward({
  from: getPostsFx.failData,
  to: setMode.prepend(() => 'FAILURE'),
})
