import {Icons} from 'icons'
import React from 'react'
import {IconButton} from 'ui/atoms/IconButton'

export const OpenButtonContainer = React.memo(({onClick}: {onClick: (props: any) => any}) => {
  return (
    <IconButton onClick={onClick}>
      <Icons.MoreVert />
    </IconButton>
  )
})
