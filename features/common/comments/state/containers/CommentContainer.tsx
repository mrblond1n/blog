import {useStoreMap} from 'effector-react'
import {ButtonDislikeContainer} from 'features/common/comments/liked/containers/ButtonDislikeContainer'
import {ButtonLikeContainer} from 'features/common/comments/liked/containers/ButtonLikeContainer'
import {MenuContainer} from 'features/common/comments/menu/containers/MenuContainer'
import {ButtonContainer} from 'features/common/comments/reply/containers/ButtonContainer'
import {FieldContainer} from 'features/common/comments/reply/containers/FieldContainer'
import {SendButtonContainer} from 'features/common/comments/reply/containers/SendButtonContainer'
import {ToggleButtonContainer} from 'features/common/comments/reply/containers/ToggleButtonContainer'
import {onSend} from 'features/common/comments/reply/model/events'
import {$commentsIndex} from 'features/common/comments/state/model/stores'
import {getInitials} from 'features/common/comments/state/utils'
import React from 'react'
import {Avatar} from 'ui/atoms/Avatar'
import {Body} from 'ui/atoms/Body'
import {Caption} from 'ui/atoms/Caption'
import {Form} from 'ui/atoms/Form'
import {Stack} from 'ui/atoms/Stack'
import {dateFromNow} from 'utils/date'

export const CommentContainer = React.memo(({id}: {id: string}) => {
  return (
    <Stack>
      <CommentAvatar id={id} />

      <Stack direction="column" spacing={1} width="100%">
        <Stack justifyContent="space-between">
          <CommentHeader id={id} />
          <MenuContainer id={id} />
        </Stack>

        <CommentBodyContainer id={id} />

        <CommentFooter id={id} />

        <CommentActions id={id} />
      </Stack>
    </Stack>
  )
})

export const CommentBodyContainer = React.memo(({id}: {id: string}) => {
  const comment = useStoreMap({
    store: $commentsIndex,
    keys: [id],
    fn: (state, [id]) => state[id],
  })

  return <Body>{comment.text}</Body>
})

const CommentAvatar = React.memo(({id}: {id: string}) => {
  const comment = useStoreMap({
    store: $commentsIndex,
    keys: [id],
    fn: (state, [id]) => state[id],
  })

  const initials = getInitials(comment.author)

  return <Avatar>{initials}</Avatar>
})

const CommentHeader = React.memo(({id}: {id: string}) => {
  const comment = useStoreMap({
    store: $commentsIndex,
    keys: [id],
    fn: (state, [id]) => state[id],
  })

  const date = dateFromNow(comment.created_at)

  return (
    <Stack alignItems="center">
      <Body>{comment.author}</Body>
      <Caption>{date}</Caption>
    </Stack>
  )
})

const CommentFooter = React.memo(({id}: {id: string}) => {
  return (
    <Stack spacing={0.5}>
      <ButtonLikeContainer id={id} />
      <ButtonDislikeContainer id={id} />
      <ButtonContainer id={id} />
    </Stack>
  )
})

const CommentActions = React.memo(({id}: {id: string}) => {
  return (
    <Stack direction="column">
      <Form onSubmit={onSend}>
        <FieldContainer id={id} />
        <SendButtonContainer id={id} />
        <ToggleButtonContainer id={id} />
      </Form>
    </Stack>
  )
})
