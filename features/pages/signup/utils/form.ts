import {TField} from 'types';

export const fields: TField[] = [
    {
        autoComplete: 'on',
        id: 'firstName',
        label: 'First name',
        required: true,
        type: 'text',
    },
    {
        autoComplete: 'on',
        id: 'lastName',
        label: 'Last name',
        required: true,
        type: 'text',
    },
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
    {
        autoComplete: 'on',
        id: 'confirmPassword',
        label: 'Repeat password',
        required: true,
        type: 'password',
    },
];
