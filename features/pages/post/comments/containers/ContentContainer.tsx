import {CommentFormContainer} from 'features/common/comments/state/containers/CommentFormContainer'
import {CommentsContainer} from 'features/common/comments/state/containers/CommentsContainer'
import React from 'react'
import {SectionTemplate} from 'ui/templates/SectionTemplate'

export const ContentContainer = () => {
  return (
    <SectionTemplate>
      <CommentFormContainer />
      <CommentsContainer />
    </SectionTemplate>
  )
}
