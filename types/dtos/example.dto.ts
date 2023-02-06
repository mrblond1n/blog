import * as t from 'utils/validation'

const ExampleItemDto = t.type({
  value: t.string,
  id: t.string,
})

export const ExampleItemCodec = ExampleItemDto
export const ExampleItemsCodec = t.array(ExampleItemCodec)
export type TExampleItemDto = t.TypeOf<typeof ExampleItemDto>
