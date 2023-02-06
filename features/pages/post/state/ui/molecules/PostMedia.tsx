import React from 'react'
import {Card} from 'ui/atoms/Card'

export const PostMedia = React.memo(({img}: {img: string}) => {
  return <Card.Media alt="post image" component="img" src={img} />
})
