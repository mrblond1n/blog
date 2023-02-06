import * as t from 'io-ts'

export const decode = <C extends t.Any>(codec: C, data: unknown): t.TypeOf<C> => {
  const either = codec.decode(data)

  if (either._tag === 'Right') {
    return either.right
  } else {
    throw new Error('no matches')
  }
}
