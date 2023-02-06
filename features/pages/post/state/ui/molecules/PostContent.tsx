import React from 'react'
import {Typography} from 'ui/atoms'
import {Card} from 'ui/atoms/Card'

export const PostContent = ({description, title}: {description: string; title: string}) => {
  return (
    <Card.Content>
      <Typography variant="h5">{title}</Typography>

      <Typography variant="body2">{description}</Typography>
    </Card.Content>
  )
}
