import {forward, guard, sample} from 'effector'
import {createGate} from 'effector-react'
import {setUser} from 'features/app/model/events'
import {$appState, setAppState} from 'features/app/model/stores'
import {addField, addFields, onSubmit, resetForm} from 'features/common/form/model/events'
import {$valueIndex} from 'features/common/form/model/stores'
import {createUserFx, signUpFx} from 'features/pages/signup/model/effects'
import {fields} from 'features/pages/signup/utils/form'
import {toMain} from 'features/router/model/events'
import {iterate} from 'utils/effector/iterate'

export const Gate = createGate()

guard({
  clock: Gate.open,
  source: $appState,
  filter: state => state === 'AUTHORIZED',
  target: toMain,
})

sample({
  clock: Gate.open,
  fn: () => fields,
  target: addFields,
})

const newFieldEvent = iterate(addFields)

forward({
  from: newFieldEvent,
  to: addField,
})
sample({
  clock: onSubmit,
  source: $valueIndex,
  filter: Gate.status,
  fn: data => {
    if (data.password === data.confirmPassword) return {...data, displayName: `${data.firstName} ${data.lastName}`}
    throw new Error('no correct data')
  },
  target: signUpFx,
})

forward({
  from: signUpFx.doneData,
  to: [setAppState.authorize, toMain],
})

sample({
  clock: signUpFx.done,
  fn: ({result: {uid, admin}, params: {email, displayName}}) => ({email, photoUrl: null, displayName, uid, admin}),
  target: createUserFx,
})

forward({
  from: createUserFx.doneData,
  to: setUser,
})

forward({
  from: Gate.open,
  to: resetForm,
})
