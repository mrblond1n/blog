import {useGate} from 'effector-react'
import {ContentContainer} from 'features/pages/posts/containers/ContentContainer'
import {CreatePostFormContainer} from 'features/pages/posts/containers/CreatePostFormContainer'
import {LoadButtonContainer} from 'features/pages/posts/containers/LoadButtonContainer'
import {Gate} from 'features/pages/posts/model'
import React from 'react'
import {SectionTemplate} from 'ui/templates/SectionTemplate'

export default () => {
  useGate(Gate)

  return (
    <SectionTemplate title={<h1>{'POSTS'}</h1>}>
      <CreatePostFormContainer />
      <ContentContainer />
      <LoadButtonContainer />
    </SectionTemplate>
  )
}
