import React from 'react'
import {Avatar} from 'ui/atoms/Avatar'
import {Card} from 'ui/atoms/Card'

export const PostHeader = React.memo(
  ({initials, subtitle, title}: {initials: string; subtitle: string; title: string}) => {
    return <Card.Header avatar={<Avatar>{initials}</Avatar>} subheader={subtitle} title={title} />
  }
)
