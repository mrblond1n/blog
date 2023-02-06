import {useStore, useStoreMap} from 'effector-react'
import {$uid} from 'features/app/model/stores'
import {onLike} from 'features/common/comments/liked/model/events'
import {$likedUsersIndex} from 'features/common/comments/liked/model/stores'
import {Icons} from 'icons'

import React from 'react'
import {Badge} from 'ui/atoms/Badge'
import {IconButton} from 'ui/atoms/IconButton'

export const ButtonLikeContainer = React.memo(({id}: {id: string}) => {
  const usersList = useStoreMap({
    store: $likedUsersIndex,
    keys: [id],
    defaultValue: [],
    fn: (state, [id]) => state[id],
  })

  const uid = useStore($uid)

  const isClicked = React.useMemo(() => usersList.includes(uid), [usersList, uid])
  const color = React.useMemo(() => (isClicked ? 'primary' : 'secondary'), [isClicked])

  const handleClick = React.useCallback(() => onLike(id), [id])

  return (
    <Badge badgeContent={usersList.length} color="primary">
      <IconButton color={color} disabled={!uid} onClick={handleClick} size="small">
        <Icons.ThumbUp fontSize="inherit" />
      </IconButton>
    </Badge>
  )
})
