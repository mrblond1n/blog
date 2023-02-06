import {INTL} from 'constants/intl'
import {useStore, useStoreMap} from 'effector-react'
import {$appState} from 'features/app/model/stores'
import {onRemove} from 'features/pages/posts/model/events'
import {$disabledIndex, $ownedIndex} from 'features/pages/posts/model/stores'
import React from 'react'
import {Button} from 'ui/atoms/Button'
import {intl} from 'utils/intl'

export const PostActionContainer = React.memo(({id}: {id: string}) => {
  const state = useStore($appState)
  const isOwned = useStoreMap({
    store: $ownedIndex,
    keys: [id],
    fn: (state, [id]) => state[id],
  })

  const disabled = useStoreMap({
    store: $disabledIndex,
    keys: [id],
    fn: (state, [id]) => state[id],
  })

  const handleClick = React.useCallback(() => onRemove(id), [id])

  return state === 'AUTHORIZED' && isOwned ? (
    <Button disabled={disabled} onClick={handleClick}>
      {intl(INTL.POSTS.REMOVE)}
    </Button>
  ) : null
})
