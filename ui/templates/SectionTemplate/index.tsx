import {styled} from 'utils/styles'
import React from 'react'

type TProps = {
  children: React.ReactNode
  title?: React.ReactNode
}

export const SectionTemplate = React.memo(({children, title}: TProps) => {
  return (
    <Section>
      {title}
      {children}
    </Section>
  )
})

const Section = styled('section')(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '1440px',

  padding: theme.spacing(5),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(1),
  },

  paddingTop: theme.spacing(2),
}))
