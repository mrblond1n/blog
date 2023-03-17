import {StackProps} from '@mui/material'
import React from 'react'
import {Stack} from 'ui/atoms/Stack'
import {styled} from 'utils/styles'

export const Wrapper = ({children, ...props}: StackProps) => (
  <StyledStack alignItems="center" justifyContent="flex-end" {...props}>
    {children}
  </StyledStack>
)

const StyledStack = styled(Stack)({
  maxWidth: '1440px',
  margin: '0 auto',
  padding: '6px 0',
})
