import React, {FormEvent, InputHTMLAttributes} from 'react'
import {Stack} from 'ui/atoms/Stack'
import {styled} from 'utils/styles'

interface IProps extends InputHTMLAttributes<HTMLFormElement> {
  refWrapper?: React.RefObject<HTMLFormElement>
}

export const Form = React.memo(({children, onSubmit, refWrapper, ...props}: IProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit?.(e)
  }

  return (
    <FormStyled {...props} ref={refWrapper} aria-label="form" onSubmit={handleSubmit}>
      <Stack direction="column">{children}</Stack>
    </FormStyled>
  )
})

const FormStyled = styled('form')(({theme}) => ({
  width: '100%',
  margin: `${theme.spacing(2)} 0`,
}))
