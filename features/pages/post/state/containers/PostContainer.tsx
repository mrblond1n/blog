import {INTL} from 'constants/intl'
import {useEvent, useStore} from 'effector-react'
import {$isAdmin, $uid} from 'features/app/model/stores'
import {CancelBtnContainer, ModalContainer} from 'features/common/modal/containers/ModalContainer'
import {openModal} from 'features/common/modal/models/events'
import {removePost} from 'features/pages/post/state/model/events'
import {$author, $body, $createdAt, $img, $post, $text, $title} from 'features/pages/post/state/model/stores'
import {PostContent} from 'features/pages/post/state/ui/molecules/PostContent'
import {PostHeader} from 'features/pages/post/state/ui/molecules/PostHeader'
import {PostMedia} from 'features/pages/post/state/ui/molecules/PostMedia'
import {concatStrings, getInitials} from 'features/pages/post/utils'
import {Icons} from 'icons'
import React from 'react'
import {Paper, Typography} from 'ui/atoms'
import {Button} from 'ui/atoms/Button'

import {IconButton} from 'ui/atoms/IconButton'
import {Stack} from 'ui/atoms/Stack'
import {MarkdownPreview} from 'ui/molecules/Markdown'
import {intl} from 'utils/intl'
import {styled} from 'utils/styles'

export const PostContainer = () => {
  return (
    <Wrapper>
      <Stack direction="column">
        <HeaderContainer />
        <ImageContainer />
        <BodyContainer />
      </Stack>
    </Wrapper>
  )
}

const BodyContainer = () => {
  const body = useStore($body)
  const title = useStore($title)
  const text = useStore($text)

  return (
    <PostContent description={body} title={title}>
      <MarkdownPreview value={text} />
    </PostContent>
  )
}

const ActionsContainer = () => {
  return (
    <Stack>
      <RemoveButtonContainer />
    </Stack>
  )
}

const RemoveButtonContainer = () => {
  const post = useStore($post)
  const id = String(post?.id)
  const onClick = useEvent(openModal)
  const handleClick = () => onClick(id)
  const postOwner = useStore($uid) === useStore($post)?.uid

  if (!useStore($isAdmin) || !postOwner) return null

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <Icons.DeleteOutline />
      </IconButton>
      <ModalContainer id={id}>
        <Typography>{intl(INTL.QUESTIONS.REMOVE_POST)}</Typography>

        <Stack justifyContent="flex-end">
          <CancelBtnContainer id={id} />

          <RemoveBtnContainer />
        </Stack>
      </ModalContainer>
    </React.Fragment>
  )
}

const RemoveBtnContainer = () => {
  const onClick = useEvent(removePost)
  const post = useStore($post)
  const handleClick = () => post?.id && onClick(post.id)

  return (
    <Button onClick={handleClick} variant="outlined">
      {intl(INTL.POSTS.REMOVE)}
    </Button>
  )
}

const HeaderContainer = () => {
  const author = useStore($author)
  const date = useStore($createdAt)
  const title = useStore($title)

  const headerTitle = React.useMemo(() => concatStrings(author, date), [author, date])
  const initials = React.useMemo(() => getInitials(author), [author])

  return (
    <Stack alignItems="center" flexWrap="wrap" justifyContent="space-between">
      <PostHeader initials={initials} subtitle={headerTitle} title={title} />

      <ActionsContainer />
    </Stack>
  )
}

const ImageContainer = () => {
  const img = useStore($img)

  return <PostMedia img={img} />
}

const Wrapper = styled(Paper)(() => ({
  width: '100%',
  padding: 24,

  '& img': {
    maxHeight: '500px',
    objectFit: 'contain',
  },
}))
