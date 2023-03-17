import {useList} from 'effector-react'
import {FieldContainer} from 'features/common/form/containers/FieldContainer'
import {onSubmit} from 'features/common/form/model/events'
import {$fieldIdsStack} from 'features/common/form/model/stores'
import React, {FormEvent} from 'react'
import {Form} from 'ui/atoms/Form'

export const FormContainer = ({children}: {children: React.ReactNode}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => onSubmit(e)

  return <Form onSubmit={handleSubmit}>{children}</Form>
}

export const FormFieldsContainer = () => {
  return useList($fieldIdsStack, id => <FieldContainer id={id} />)
}
