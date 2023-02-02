import {INTL} from 'constants/intl';
import {TField} from 'types';
import {intl} from 'utils/intl';

export const fields: TField[] = [
    {
        id: 'text',
        label: 'Comment',
        required: true,
        type: 'markdown',
        textareaProps: {
            placeholder: intl(INTL.COMMENT.PLACEHOLDER),
        },
    },
];
