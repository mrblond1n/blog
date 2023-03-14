import {Paper} from '@mui/material'
import {useStore} from 'effector-react'
import {$author, $body, $createdAt, $img, $text, $title} from 'features/pages/post/state/model/stores'
import {PostContent} from 'features/pages/post/state/ui/molecules/PostContent'
import {PostHeader} from 'features/pages/post/state/ui/molecules/PostHeader'
import {PostMedia} from 'features/pages/post/state/ui/molecules/PostMedia'
import {concatStrings, getInitials} from 'features/pages/post/utils'
import React from 'react'
import {Stack} from 'ui/atoms/Stack'
import {MarkdownPreview} from 'ui/molecules/Markdown'
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

const HeaderContainer = () => {
  const author = useStore($author)
  const date = useStore($createdAt)
  const title = useStore($title)

  const headerTitle = React.useMemo(() => concatStrings(author, date), [author, date])
  const initials = React.useMemo(() => getInitials(author), [author])

  return <PostHeader initials={initials} subtitle={headerTitle} title={title} />
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
