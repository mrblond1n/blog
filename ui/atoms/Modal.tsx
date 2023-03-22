import React from 'react'
import {ModalProps} from 'types/components'
import {Modal as MUIModal, Paper} from 'ui/atoms'
import {styled} from 'utils/styles'

export const Modal = ({children, ...props}: Omit<ModalProps, 'children'> & {children: React.ReactNode}) => {
  return (
    <StyledModal {...props}>
      <StyledPaper>{children}</StyledPaper>
    </StyledModal>
  )
}

const StyledModal = styled(MUIModal)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

const StyledPaper = styled(Paper)(({theme}) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
}))
