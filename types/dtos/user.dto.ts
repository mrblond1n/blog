import * as t from 'utils/validation';

const UserDto = t.type({
    displayName: t.nullable(t.string),
    email: t.string,
    photoUrl: t.nullable(t.string),
    uid: t.string,
});

export const UserCodec = UserDto;

export type TUserDto = t.TypeOf<typeof UserCodec>;
