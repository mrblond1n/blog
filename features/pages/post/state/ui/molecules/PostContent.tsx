import React from 'react'
import {Typography} from 'ui/atoms'
import {Card} from 'ui/atoms/Card'

type TProps = {
  children?: React.ReactNode
  description: string
  title: string
}

export const PostContent = ({children, description, title}: TProps) => {
  return (
    <Card.Content>
      <Typography variant="h5">{title}</Typography>

      <Typography variant="body2">{description}</Typography>

      {children}
    </Card.Content>
  )
}
