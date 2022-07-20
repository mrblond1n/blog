import * as t from 'utils/validation';

const UserDto = t.type({
    displayName: t.nullable(t.string),
    email: t.string,
    photoUrl: t.nullable(t.string),
    admin: t.withFallback(t.boolean, false),
    uid: t.string,
});

export const UserCodec = UserDto;
export const CheckUserCodec = t.nullable(UserDto);

export type TUserDto = t.TypeOf<typeof UserCodec>;
