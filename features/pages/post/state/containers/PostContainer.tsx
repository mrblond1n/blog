import {Paper} from '@mui/material'
import {useStore} from 'effector-react'
import {$author, $body, $createdAt, $img, $text, $title} from 'features/pages/post/state/model/stores'
import {PostContent} from 'features/pages/post/state/ui/molecules/PostContent'
import {PostHeader} from 'features/pages/post/state/ui/molecules/PostHeader'
import {PostMedia} from 'features/pages/post/state/ui/molecules/PostMedia'
import {concatStrings, getInitials} from 'features/pages/post/utils'
import React from 'react'
import {MarkdownPreview} from 'ui/molecules/Markdown'
import {styled} from 'utils/styles'

export const PostContainer = () => {
  const author = useStore($author)
  const body = useStore($body)
  const title = useStore($title)
  const img = useStore($img)
  const text = useStore($text)
  const date = useStore($createdAt)

  const headerTitle = React.useMemo(() => concatStrings(author, date), [author, date])
  const initials = React.useMemo(() => getInitials(author), [author])

  return (
    <Wrapper>
      <PostHeader initials={initials} subtitle={headerTitle} title={title} />
      <PostMedia img={img} />

      <PostContent description={body} title={title} />
      <MarkdownPreview value={text} />
    </Wrapper>
  )
}
const Wrapper = styled(Paper)(() => ({
  width: '100%',
  padding: 24,

  '& img': {
    maxHeight: '500px',
    objectFit: 'contain',
  },
}))
