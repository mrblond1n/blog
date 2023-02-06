import {useList} from 'effector-react'
import {FieldContainer} from 'features/common/form/containers/FieldContainer'
import {submitForm} from 'features/common/form/model/events'
import {$fieldIdsStack} from 'features/common/form/model/stores'

import React, {FormEvent} from 'react'
import {Form} from 'ui/molecules/Form'

export const FormContainer: React.FC = ({children}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => submitForm(e)

  return <Form onSubmit={handleSubmit}>{children}</Form>
}

export const FormFieldsContainer = () => {
  return useList($fieldIdsStack, id => <FieldContainer id={id} />)
}
