import React from 'react'
import {Typography} from 'ui/atoms'
import {Card} from 'ui/atoms/Card'
import {Stack} from 'ui/atoms/Stack'

type TProps = {
  children?: React.ReactNode
  description: string
  title: string
}

export const PostContent = ({children, description, title}: TProps) => {
  return (
    <Card.Content>
      <Stack direction="column">
        <Typography variant="h5">{title}</Typography>

        <Typography variant="body2">{description}</Typography>

        {children}
      </Stack>
    </Card.Content>
  )
}
