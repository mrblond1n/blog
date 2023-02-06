import {TExampleItemDto} from 'types/dtos/example.dto'

export const exampleItem: TExampleItemDto = {
  id: '1',
  value: 'hello',
}

export const exampleItems = [exampleItem, exampleItem, exampleItem].map((item, index) => ({
  ...item,
  id: String(index),
}))
