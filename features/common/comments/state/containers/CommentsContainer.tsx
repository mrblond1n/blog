import {useGate, useList, useStoreMap} from 'effector-react'
import {Gate} from 'features/common/comments/index'
import {$replyIdsIndex} from 'features/common/comments/reply/model/stores'
import {CommentContainer} from 'features/common/comments/state/containers/CommentContainer'
import {$discussionIdsIndex, $discussionIdsList} from 'features/common/comments/state/model/stores'
import {getUniqueArray} from 'features/common/comments/state/utils'
import React from 'react'
import {styled} from 'utils/styles'

export const CommentsContainer = React.memo(() => {
  useGate(Gate)

  return useList($discussionIdsList, id => <DiscussionContainer id={id} />)
})

const DiscussionContainer = React.memo(({id}: {id: string}) => {
  const idsList = useStoreMap({
    store: $discussionIdsIndex,
    keys: [id],
    defaultValue: [],
    fn: (state, [id]) => state[id],
  })

  const replyIdsList = useStoreMap({
    store: $replyIdsIndex,
    keys: [id],
    defaultValue: [],
    fn: (state, [id]) => state[id],
  })

  const uniqueIdsList = React.useMemo(() => getUniqueArray(idsList, replyIdsList), [replyIdsList, idsList])

  return (
    <Wrapper>
      <CommentContainer id={id} />

      {uniqueIdsList.map(id => (
        <CommentContainer key={id} id={id} />
      ))}
    </Wrapper>
  )
})

const Wrapper = styled('div')(({theme}) => ({
  width: '100%',
  '& > *:not(:first-of-type)': {
    marginLeft: theme.spacing(7),
  },
}))
