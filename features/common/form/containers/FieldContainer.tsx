import {useStore, useStoreMap} from 'effector-react'
import {onChange} from 'features/common/form/model/events'
import {$fieldIndex, $valueIndex} from 'features/common/form/model/stores'
import {TField, TValue} from 'types'
import {Autocomplete} from 'ui/atoms/Autocomplete'
import {MultipleAutocomplete} from 'ui/atoms/MultipleAutocomplete'
import {TextField} from 'ui/atoms/TextField'
import {Dropzone} from 'ui/molecules/Dropzone'
import {Markdown} from 'ui/molecules/Markdown'
import React from 'react'
import {getStoreById} from 'utils/effector/getById'

export const FieldContainer = ({id}: {id: TField['id']}) => {
  const field = useStoreMap({
    store: $fieldIndex,
    keys: [id],
    fn: (state, [id]) => state[id],
  })

  const $value = React.useMemo(() => getStoreById($valueIndex, id), [id])
  const value = useStore($value)

  const handleChange = (value: TValue) => onChange({key: id, value})

  return <Field {...field} onChange={handleChange} value={value} />
}

type TProps = Omit<TField, 'onChange'> & {onChange: (value: TValue) => void}
const Field = ({type, ...props}: TProps) => {
  switch (type) {
    case 'autocomplete':
      return <Autocomplete {...props} />
    case 'markdown':
      return <Markdown {...props} />
    case 'multiselect':
      return <MultipleAutocomplete {...props} />
    case 'image':
      return <Dropzone {...props} />
    default:
      return <TextField {...props} type={type} />
  }
}
