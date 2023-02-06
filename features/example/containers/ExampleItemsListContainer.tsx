import {useList} from 'effector-react'
import {ExampleItemContainer} from 'features/example/containers/ExampleItemContainer'
import {$exampleItemIdsList} from 'features/example/models/stores'
import React from 'react'

export const ExampleItemsListContainer = React.memo(() =>
  useList($exampleItemIdsList, id => <ExampleItemContainer id={id} />)
)
