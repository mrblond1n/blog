import {TField} from 'types';

export const fields: TField[] = [
    {
        id: 'email',
        label: 'E-mail',
        required: true,
        type: 'email',
    },
    {
        autoComplete: 'on',
        id: 'password',
        label: 'Password',
        required: true,
        type: 'password',
    },
];
