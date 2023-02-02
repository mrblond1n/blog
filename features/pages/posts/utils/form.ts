import {POST_TAGS} from 'constants/business';
import {TField} from 'types';

export const fields: TField[] = [
    {
        id: 'title',
        label: 'Title',
        required: true,
        type: 'text',
    },
    {
        id: 'description',
        label: 'Description',
        required: true,
        type: 'text',
        multiline: true,
        rows: 4,
    },
    {
        id: 'img',
        label: 'Preview',
        required: true,
        type: 'image',
    },
    {
        id: 'tags',
        label: 'Tags',
        options: POST_TAGS,
        type: 'multiselect',
    },
    {
        id: 'text',
        type: 'markdown',
        preview: 'edit',
        textareaProps: {
            placeholder: 'Text',
            required: true,
            id: 'text',
        },
    },
];
